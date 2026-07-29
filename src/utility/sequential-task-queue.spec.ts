import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SequentialTaskQueue } from "./sequential-task-queue";

describe("SequentialTaskQueue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  /**
   * 지정한 시간 뒤에 resolve 되는 작업을 만든다.
   * 실행 순서 추적을 위해 시작/종료 시점을 executionOrder에 기록한다.
   */
  function createTask(
    name: string,
    delay: number,
    executionOrder: string[] = [],
  ) {
    return vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push(`${name}:start`);
          setTimeout(() => {
            executionOrder.push(`${name}:end`);
            resolve(name);
          }, delay);
        }),
    );
  }

  it("작업을 큐에 추가할 수 있고, 추가만으로는 실행되지 않아야 한다", () => {
    const queue = new SequentialTaskQueue();
    const task1 = createTask("task1", 100);
    const task2 = createTask("task2", 100);

    queue.enqueue(task1);
    queue.enqueue(task2);

    expect(queue.size).toBe(2);
    expect(task1).not.toHaveBeenCalled();
    expect(task2).not.toHaveBeenCalled();
  });

  it("작업은 완료 시간과 관계없이 FIFO 순서로 실행되어야 한다", async () => {
    const queue = new SequentialTaskQueue();
    const executionOrder: string[] = [];

    // 뒤에 넣은 작업일수록 빨리 끝나지만, 실행 순서는 넣은 순서를 따라야 한다
    queue.enqueue(createTask("task1", 1000, executionOrder));
    queue.enqueue(createTask("task2", 300, executionOrder));
    queue.enqueue(createTask("task3", 100, executionOrder));

    const running = queue.run();
    await vi.advanceTimersByTimeAsync(1400);
    await running;

    expect(executionOrder).toEqual([
      "task1:start",
      "task1:end",
      "task2:start",
      "task2:end",
      "task3:start",
      "task3:end",
    ]);
  });

  it("한 번에 하나의 작업만 실행해야 한다", async () => {
    const queue = new SequentialTaskQueue();
    let 현재_실행_개수 = 0;
    let 최대_동시_실행_개수 = 0;

    const createTrackedTask = (delay: number) => () =>
      new Promise((resolve) => {
        현재_실행_개수 += 1;
        최대_동시_실행_개수 = Math.max(최대_동시_실행_개수, 현재_실행_개수);

        setTimeout(() => {
          현재_실행_개수 -= 1;
          resolve(undefined);
        }, delay);
      });

    queue.enqueue(createTrackedTask(1000));
    queue.enqueue(createTrackedTask(300));
    queue.enqueue(createTrackedTask(100));

    const running = queue.run();
    await vi.advanceTimersByTimeAsync(1400);
    await running;

    expect(최대_동시_실행_개수).toBe(1);
    expect(현재_실행_개수).toBe(0);
  });

  it("run()을 호출해야 큐 실행이 시작되고, 모든 작업이 끝나면 완료되어야 한다", async () => {
    const queue = new SequentialTaskQueue();
    const task1 = createTask("task1", 100);
    const task2 = createTask("task2", 100);

    queue.enqueue(task1);
    queue.enqueue(task2);

    const onFulfilled = vi.fn();
    const running = queue.run().then(onFulfilled);

    // 첫 번째 작업만 시작된 상태
    await vi.advanceTimersByTimeAsync(0);
    expect(task1).toHaveBeenCalledOnce();
    expect(task2).not.toHaveBeenCalled();
    expect(onFulfilled).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);
    expect(task2).toHaveBeenCalledOnce();
    expect(onFulfilled).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);
    await running;
    expect(onFulfilled).toHaveBeenCalledOnce();
  });

  it("작업이 실패해도 큐가 멈추지 않고 다음 작업을 실행해야 한다", async () => {
    const queue = new SequentialTaskQueue();
    const executionOrder: string[] = [];

    const failedTask = vi.fn(
      () =>
        new Promise((_resolve, reject) => {
          executionOrder.push("failedTask:start");
          setTimeout(() => {
            executionOrder.push("failedTask:error");
            reject(new Error("failed"));
          }, 100);
        }),
    );
    const nextTask = createTask("nextTask", 100, executionOrder);

    queue.enqueue(failedTask);
    queue.enqueue(nextTask);

    const running = queue.run();
    await vi.advanceTimersByTimeAsync(200);

    // 실패한 작업 때문에 run() 자체가 reject 되면 안 된다
    await expect(running).resolves.toBeUndefined();
    expect(nextTask).toHaveBeenCalledOnce();
    expect(executionOrder).toEqual([
      "failedTask:start",
      "failedTask:error",
      "nextTask:start",
      "nextTask:end",
    ]);
  });

  it("실행 중에 run()을 다시 호출해도 작업이 중복 실행되지 않아야 한다", async () => {
    const queue = new SequentialTaskQueue();
    const executionOrder: string[] = [];
    const task1 = createTask("task1", 100, executionOrder);
    const task2 = createTask("task2", 100, executionOrder);

    queue.enqueue(task1);
    queue.enqueue(task2);

    const first = queue.run();
    const second = queue.run();

    await vi.advanceTimersByTimeAsync(200);
    await Promise.all([first, second]);

    expect(task1).toHaveBeenCalledOnce();
    expect(task2).toHaveBeenCalledOnce();
    expect(executionOrder).toEqual([
      "task1:start",
      "task1:end",
      "task2:start",
      "task2:end",
    ]);
  });

  it("실행이 끝난 작업은 큐에서 제거되어야 한다", async () => {
    const queue = new SequentialTaskQueue();
    const task1 = createTask("task1", 100);
    const task2 = createTask("task2", 100);

    queue.enqueue(task1);
    queue.enqueue(task2);
    expect(queue.size).toBe(2);

    const running = queue.run();
    await vi.advanceTimersByTimeAsync(200);
    await running;

    expect(queue.size).toBe(0);

    // 비어 있는 큐를 다시 실행해도 이미 끝난 작업이 재실행되면 안 된다
    await queue.run();
    expect(task1).toHaveBeenCalledOnce();
    expect(task2).toHaveBeenCalledOnce();
  });

  it("현재 대기 중인 작업 수를 확인할 수 있다", async () => {
    const queue = new SequentialTaskQueue();

    expect(queue.size).toBe(0);

    queue.enqueue(createTask("task1", 100));
    expect(queue.size).toBe(1);

    queue.enqueue(createTask("task2", 100));
    queue.enqueue(createTask("task3", 100));
    expect(queue.size).toBe(3);

    const running = queue.run();

    // 첫 번째 작업이 실행되면 대기 중인 작업은 2개
    await vi.advanceTimersByTimeAsync(0);
    expect(queue.size).toBe(2);

    await vi.advanceTimersByTimeAsync(100);
    expect(queue.size).toBe(1);

    await vi.advanceTimersByTimeAsync(200);
    await running;
    expect(queue.size).toBe(0);
  });
});
