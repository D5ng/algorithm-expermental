import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AsyncTaskQueue } from "./async-task-queue";

type TaskOptions = {
	duration?: number;
	fail?: boolean;
};

/**
 * 실행 로그 / 동시 실행 개수를 추적하는 작업 팩토리
 * - `${name}:start` 는 task 가 호출된 시점
 * - `${name}:resolve` / `${name}:reject` 는 task 의 Promise 가 종료된 시점
 */
const createTracker = () => {
	const log: string[] = [];
	let running = 0;
	let maxRunning = 0;

	const createTask = (name: string, options: TaskOptions = {}) => {
		const { duration = 100, fail = false } = options;

		return vi.fn(() => {
			log.push(`${name}:start`);
			running += 1;
			maxRunning = Math.max(maxRunning, running);

			return new Promise((resolve, reject) => {
				const settle = () => {
					running -= 1;
					if (fail) {
						log.push(`${name}:reject`);
						reject(new Error(name));
						return;
					}
					log.push(`${name}:resolve`);
					resolve(name);
				};

				if (duration === 0) {
					settle();
					return;
				}
				setTimeout(settle, duration);
			});
		});
	};

	return {
		log,
		createTask,
		get maxRunning() {
			return maxRunning;
		},
	};
};

/** then 체인으로 이어지는 마이크로태스크를 모두 비운다 */
const flushMicrotasks = async (times = 50) => {
	for (let i = 0; i < times; i += 1) {
		await Promise.resolve();
	}
};

describe("AsyncTaskQueue", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	describe("동시 실행 개수 제한", () => {
		it("concurrency 개수만큼만 실행을 시작하고 나머지는 대기시킨다", async () => {
			const { createTask } = createTracker();
			const queue = new AsyncTaskQueue(2);
			const task1 = createTask("task1");
			const task2 = createTask("task2");
			const task3 = createTask("task3");

			queue.queue(task1);
			queue.queue(task2);
			queue.queue(task3);

			await flushMicrotasks();

			expect(task1).toHaveBeenCalledOnce();
			expect(task2).toHaveBeenCalledOnce();
			expect(task3).not.toHaveBeenCalled();
		});

		it("작업 수가 concurrency 보다 적으면 모두 실행한다", async () => {
			const { createTask } = createTracker();
			const queue = new AsyncTaskQueue(3);
			const task1 = createTask("task1");
			const task2 = createTask("task2");

			queue.queue(task1);
			queue.queue(task2);

			await flushMicrotasks();

			expect(task1).toHaveBeenCalledOnce();
			expect(task2).toHaveBeenCalledOnce();
		});

		it("실행 중인 작업 하나가 끝날 때마다 대기 작업을 하나씩만 꺼낸다", async () => {
			const { createTask } = createTracker();
			const queue = new AsyncTaskQueue(1);
			const task1 = createTask("task1", { duration: 100 });
			const task2 = createTask("task2", { duration: 100 });
			const task3 = createTask("task3", { duration: 100 });

			queue.queue(task1);
			queue.queue(task2);
			queue.queue(task3);

			await vi.advanceTimersByTimeAsync(100);
			expect(task2).toHaveBeenCalledOnce();
			expect(task3).not.toHaveBeenCalled();

			await vi.advanceTimersByTimeAsync(100);
			expect(task3).toHaveBeenCalledOnce();
		});

		it("어느 시점에도 동시 실행 개수가 concurrency 를 초과하지 않는다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(3);

			// 실행 시간이 제각각이라 완료 순서가 뒤섞이는 상황
			queue.queue(tracker.createTask("a", { duration: 500 }));
			queue.queue(tracker.createTask("b", { duration: 100 }));
			queue.queue(tracker.createTask("c", { duration: 300 }));
			queue.queue(tracker.createTask("d", { duration: 100 }));
			queue.queue(tracker.createTask("e", { duration: 200 }));
			queue.queue(tracker.createTask("f", { duration: 100 }));

			await vi.advanceTimersByTimeAsync(200);

			// 이미 실행 중인 상태에서 추가로 투입되는 작업
			queue.queue(tracker.createTask("g", { duration: 100 }));
			queue.queue(tracker.createTask("h", { duration: 100 }));

			await vi.advanceTimersByTimeAsync(2000);

			expect(tracker.maxRunning).toBe(3);
		});

		it("모든 작업이 끝난 뒤 추가한 작업도 바로 실행된다", async () => {
			const { createTask } = createTracker();
			const queue = new AsyncTaskQueue(2);

			queue.queue(createTask("task1"));
			queue.queue(createTask("task2"));
			queue.queue(createTask("task3"));

			await vi.advanceTimersByTimeAsync(1000);

			const later = createTask("later");
			queue.queue(later);

			await flushMicrotasks();

			expect(later).toHaveBeenCalledOnce();
		});
	});

	describe("FIFO 실행 순서", () => {
		it("concurrency 가 1이면 추가한 순서대로 하나씩 실행한다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(1);

			for (const name of ["t1", "t2", "t3", "t4", "t5"]) {
				queue.queue(tracker.createTask(name, { duration: 100 }));
			}

			await flushMicrotasks();
			expect(tracker.log).toEqual(["t1:start"]);

			await vi.advanceTimersByTimeAsync(1000);

			expect(tracker.log).toEqual([
				"t1:start",
				"t1:resolve",
				"t2:start",
				"t2:resolve",
				"t3:start",
				"t3:resolve",
				"t4:start",
				"t4:resolve",
				"t5:start",
				"t5:resolve",
			]);
		});

		it("대기열에 쌓인 작업은 완료 순서와 무관하게 추가된 순서로 시작된다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(2);

			// 먼저 끝나는 쪽은 slow 가 아니라 fast → 대기열이 fast 쪽으로 먼저 풀린다
			queue.queue(tracker.createTask("slow", { duration: 1000 }));
			queue.queue(tracker.createTask("fast", { duration: 100 }));
			queue.queue(tracker.createTask("queued1", { duration: 100 }));
			queue.queue(tracker.createTask("queued2", { duration: 100 }));
			queue.queue(tracker.createTask("queued3", { duration: 100 }));

			await vi.advanceTimersByTimeAsync(2000);

			const startOrder = tracker.log.filter((entry) => entry.endsWith(":start"));
			expect(startOrder).toEqual(["slow:start", "fast:start", "queued1:start", "queued2:start", "queued3:start"]);
		});

		it("즉시 완료되는 작업들도 순서를 지키며 모두 실행된다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(1);

			for (const name of ["i1", "i2", "i3", "i4"]) {
				queue.queue(tracker.createTask(name, { duration: 0 }));
			}

			await flushMicrotasks();

			expect(tracker.log.filter((entry) => entry.endsWith(":start"))).toEqual([
				"i1:start",
				"i2:start",
				"i3:start",
				"i4:start",
			]);
			expect(tracker.maxRunning).toBe(1);
		});
	});

	describe("실패한 작업 처리", () => {
		it("작업이 거부되어도 큐가 멈추지 않고 다음 작업을 실행한다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(1);
			const failed = tracker.createTask("failed", { fail: true });
			const next = tracker.createTask("next");

			queue.queue(failed);
			queue.queue(next);

			await flushMicrotasks();
			expect(next).not.toHaveBeenCalled();

			await vi.advanceTimersByTimeAsync(100);

			expect(next).toHaveBeenCalledOnce();
			expect(tracker.log).toEqual(["failed:start", "failed:reject", "next:start"]);
		});

		it("대기열을 거쳐 실행된 작업이 실패해도 그 뒤 작업이 실행된다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(1);

			queue.queue(tracker.createTask("ok"));
			queue.queue(tracker.createTask("failed", { fail: true }));
			queue.queue(tracker.createTask("last"));

			await vi.advanceTimersByTimeAsync(1000);

			expect(tracker.log.filter((entry) => entry.endsWith(":start"))).toEqual([
				"ok:start",
				"failed:start",
				"last:start",
			]);
		});

		it("연속으로 실패해도 남은 작업을 모두 소진한다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(2);

			queue.queue(tracker.createTask("f1", { fail: true }));
			queue.queue(tracker.createTask("f2", { fail: true }));
			queue.queue(tracker.createTask("f3", { fail: true }));
			const survivor = tracker.createTask("survivor");
			queue.queue(survivor);

			await vi.advanceTimersByTimeAsync(1000);

			expect(survivor).toHaveBeenCalledOnce();
			expect(tracker.maxRunning).toBe(2);
		});

		it("동기적으로 거부되는 Promise 를 반환해도 큐가 진행된다", async () => {
			const queue = new AsyncTaskQueue(1);
			const rejectImmediately = vi.fn(() => Promise.reject(new Error("immediate")));
			const next = vi.fn(() => Promise.resolve("next"));

			queue.queue(rejectImmediately);
			queue.queue(next);

			await flushMicrotasks();

			expect(rejectImmediately).toHaveBeenCalledOnce();
			expect(next).toHaveBeenCalledOnce();
		});

		it("거부된 작업의 에러가 queue() 호출부로 새어나가지 않는다", async () => {
			const queue = new AsyncTaskQueue(1);
			const throwingTask = vi.fn(() => Promise.reject(new Error("boom")));

			// 처리되지 않은 rejection 이 남으면 vitest 가 테스트 실행을 실패시킨다
			expect(() => queue.queue(throwingTask)).not.toThrow();

			await flushMicrotasks();

			expect(throwingTask).toHaveBeenCalledOnce();
		});

		it("Promise 를 반환하기 전에 동기적으로 throw 해도 queue() 호출부로 새지 않는다", () => {
			const queue = new AsyncTaskQueue(1);
			const syncThrowTask = vi.fn(() => {
				throw new Error("sync");
			});

			expect(() => queue.queue(syncThrowTask)).not.toThrow();
			expect(syncThrowTask).toHaveBeenCalledOnce();
		});

		it("동기적으로 throw 하는 작업 뒤에도 큐가 계속 진행된다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(1);
			const syncThrowTask = vi.fn(() => {
				throw new Error("sync");
			});
			const next = tracker.createTask("next");

			queue.queue(syncThrowTask);
			queue.queue(next);

			await vi.advanceTimersByTimeAsync(100);

			expect(next).toHaveBeenCalledOnce();
			expect(tracker.log).toEqual(["next:start", "next:resolve"]);
		});

		it("대기열에서 꺼낸 작업이 동기적으로 throw 해도 그 뒤 작업이 실행된다", async () => {
			const tracker = createTracker();
			const queue = new AsyncTaskQueue(1);
			const syncThrowTask = vi.fn(() => {
				throw new Error("sync");
			});

			// 첫 작업이 끝난 뒤 대기열에서 꺼내지는 시점에 throw 하는 경우
			queue.queue(tracker.createTask("ok"));
			queue.queue(syncThrowTask);
			queue.queue(tracker.createTask("last"));

			await vi.advanceTimersByTimeAsync(1000);

			expect(syncThrowTask).toHaveBeenCalledOnce();
			expect(tracker.log.filter((entry) => entry.endsWith(":start"))).toEqual(["ok:start", "last:start"]);
		});
	});
});
