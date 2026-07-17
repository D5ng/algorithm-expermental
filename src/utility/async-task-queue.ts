export class AsyncTaskQueue {
  private concurrency: number;
  private 현재_동시_실행_개수: number;
  private 실행_대기_배열: (() => Promise<unknown>)[];

  constructor(concurrency: number) {
    // Initialize the queue with the specified concurrency limit
    this.concurrency = concurrency;
    // 현재 실행 중인 수가 최대 실행 개수보다 넘으면 안됨.
    this.현재_동시_실행_개수 = 0;
    // 실행 대기중인 것을 담기위한 배열
    this.실행_대기_배열 = [];
  }
  queue(task: () => Promise<unknown>) {
    // Add an async task to the queue
    // [task1]
    // [task1, task2]
    // [task1, task2, task3]
    // task1: 실행
    // task2: 실행
    // task3: task1, task2가 작업이 끝난게 아니라면 대기.

    // 현재 실행 개수가 최대 동시 실행 개수보다 작으면 실행
    if (this.현재_동시_실행_개수 < this.concurrency) {
      this.현재_동시_실행_개수 += 1;

      task()
        .then(() => {
          this.현재_동시_실행_개수 -= 1;
          const 가장_오래된_함수 = this.실행_대기_배열.shift();

          if (typeof 가장_오래된_함수 === "undefined") {
            return;
          }

          try {
            가장_오래된_함수();
          } catch (error) {}
        })
        .catch(() => {
          this.현재_동시_실행_개수 -= 1;
          const 가장_오래된_함수 = this.실행_대기_배열.shift();

          if (typeof 가장_오래된_함수 === "undefined") {
            return;
          }

          가장_오래된_함수();
        });
    } else {
      this.실행_대기_배열.push(task);
    }
  }
}

const queue = new AsyncTaskQueue(2); // Allow up to 2 tasks to run concurrently
// Example async tasks
const task1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 done"), 1000));
const task2 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject("Task 2 failed"), 500),
  );
const task3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 done"), 200));
// Queue tasks
queue.queue(task1); // Starts immediately
queue.queue(task2); // Starts immediately (concurrency = 2)
queue.queue(task3); // Waits until one of the first two tasks completes
