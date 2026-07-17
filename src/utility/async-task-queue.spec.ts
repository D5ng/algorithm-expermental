import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AsyncTaskQueue } from "./async-task-queue";

describe("AsyncTaskQueue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("concurrency 개수만큼 작업을 즉시 실행하고, 초과한 작업은 대기해야 한다", async () => {
    const queue = new AsyncTaskQueue(2);
    const executionOrder: string[] = [];

    const task1 = vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push("task1:start");
          setTimeout(() => {
            executionOrder.push("task1:end");
            resolve("task1");
          }, 100);
        }),
    );
    const task2 = vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push("task2:start");
          setTimeout(() => {
            executionOrder.push("task2:end");
            resolve("task2");
          }, 100);
        }),
    );
    const task3 = vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push("task3:start");
          setTimeout(() => {
            executionOrder.push("task3:end");
            resolve("task3");
          }, 100);
        }),
    );

    queue.queue(task1);
    queue.queue(task2);
    queue.queue(task3);

    expect(task1).toHaveBeenCalledOnce();
    expect(task2).toHaveBeenCalledOnce();
    expect(task3).not.toHaveBeenCalled();
    expect(executionOrder).toEqual(["task1:start", "task2:start"]);

    await vi.advanceTimersByTimeAsync(100);

    expect(task3).toHaveBeenCalledOnce();
    expect(executionOrder).toContain("task3:start");
  });

  it("concurrency가 1이면 첫 번째 작업이 끝난 후 두 번째 작업을 실행해야 한다", async () => {
    const queue = new AsyncTaskQueue(1);
    const executionOrder: string[] = [];

    const task1 = vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push("task1:start");
          setTimeout(() => {
            executionOrder.push("task1:end");
            resolve("task1");
          }, 100);
        }),
    );
    const task2 = vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push("task2:start");
          setTimeout(() => {
            executionOrder.push("task2:end");
            resolve("task2");
          }, 100);
        }),
    );

    queue.queue(task1);
    queue.queue(task2);

    expect(task1).toHaveBeenCalledOnce();
    expect(task2).not.toHaveBeenCalled();
    expect(executionOrder).toEqual(["task1:start"]);

    await vi.advanceTimersByTimeAsync(100);

    expect(task2).toHaveBeenCalledOnce();
    expect(executionOrder).toEqual([
      "task1:start",
      "task1:end",
      "task2:start",
    ]);
  });

  it("작업에서 에러가 발생해도 큐가 멈추지 않고 다음 작업을 실행해야 한다", async () => {
    const queue = new AsyncTaskQueue(1);
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
    const nextTask = vi.fn(
      () =>
        new Promise((resolve) => {
          executionOrder.push("nextTask:start");
          setTimeout(() => {
            executionOrder.push("nextTask:end");
            resolve("nextTask");
          }, 100);
        }),
    );

    queue.queue(failedTask);
    queue.queue(nextTask);

    expect(failedTask).toHaveBeenCalledOnce();
    expect(nextTask).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);

    expect(nextTask).toHaveBeenCalledOnce();
    expect(executionOrder).toEqual([
      "failedTask:start",
      "failedTask:error",
      "nextTask:start",
    ]);
  });
});
