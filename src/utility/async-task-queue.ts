// 지정된 최대 동시 실행 개수 제한에 따라 비동기 작업의 실행을 관리하는 `AsyncTaskQueue` 클래스를 설계하고 구현하세요.

// 작업 큐는 다음 조건을 만족해야 합니다.

// * 작업은 추가된 순서대로 실행되어야 합니다. 즉, FIFO(선입선출)를 따라야 합니다.
// * 동시에 실행되는 작업의 수는 지정된 최대 동시 실행 개수를 초과해서는 안 됩니다.
// * 작업이 반환한 Promise가 거부되더라도 해당 오류는 별도의 처리 없이 무시해야 합니다.
// * 어떤 작업이 실패하더라도 큐는 중단되지 않고 남아 있는 작업을 계속 처리해야 합니다.

export class AsyncTaskQueue {
  constructor(concurrency) {
    // Initialize the queue with the specified concurrency limit
  }
  queue(task) {
    // Add an async task to the queue
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
