// type AsyncTask = () => Promise<unknown>;

// export class SequentialTaskQueue<Task extends AsyncTask = AsyncTask> {
//   private taskQueue: Task[];
//   private isRunning: boolean;

//   constructor() {
//     this.taskQueue = [];
//     this.isRunning = false;
//   }
//   /**
//    * 큐를 추가할 수 있는 메서드
//    * 입력: 새로 들어올 작업
//    * 출력: 없음
//    * @param task 새로 들어올 작업
//    */
//   enqueue(task: Task): void {
//     this.taskQueue.push(task);
//   }

//   /**
//    * 대기열 작업 큐를 실행하는 함수
//    *
//    * 입력: 없음
//    *
//    * 처리:
//    * - 각 작업이 성공, 실패해도 모든 작업이 중단되지 않고 실행한다
//    * - 중복으로 호출될 수 없다
//    *
//    * 출력: 없음
//    *
//    * 애매한 요구사항
//    * - 작업이 모두 끝난 이후 호출 가능하도록 개선
//    * @returns
//    */
//   async run(): Promise<void> {
//     // task가 비어있거나, run 메서드가 진행 중 이라면
//     if (!this.hasPendingTask() || this.isRunning) {
//       return;
//     }

//     this.isRunning = true;

//     // 대기열에 등록된 작업이 없을 때 까지 반복
//     while (this.hasPendingTask()) {
//       await this.processNextTask();
//     }

//     this.isRunning = false;
//   }

//   get size(): number {
//     return this.taskQueue.length;
//   }

//   /**
//    * 다음 작업을 처리하는 함수
//    * 책임:
//    * 대기열 큐에서 가장 오래된 작업을 꺼낸다
//    * 작업이 없다면 무시한다
//    * 작업을 실행한다
//    * 작업이 실패하면 에러가 발생한다
//    * @returns
//    */
//   private async processNextTask() {
//     // 작업 대기열에서 가장 오래된 함수를 꺼내기
//     const task = this.taskQueue.shift();

//     if (typeof task === "undefined") {
//       return;
//     }

//     // task 함수 실행 및 내부에서 에러가 발생했을 때를 대비
//     try {
//       await task();
//     } catch (error) {
//       console.error(`에러가 발생했어요: ${error}`);
//     }
//   }

//   // 작업 큐가 비어있는지 판별
//   // 작업이 비어있는지 판별하는것과 대기중인 작업이 있냐
//   // 대기중인 작업이 비어있는지 vs 대기중이 작업이 있는지?
//   // 긍정형이 조금 더 읽기 쉽다.
//   private hasPendingTask() {
//     return this.taskQueue.length > 0;
//   }
// }

type AsyncTask = () => Promise<unknown>;

/**
 * 등록된 비동기 작업을 한 번에 하나씩 순차적으로 실행하는 작업 큐.
 *
 * ### 요구사항
 *
 * **등록과 실행**
 * - 작업은 `enqueue`로 등록만 되며, 등록하는 것만으로는 실행되지 않는다.
 * - 큐의 실행은 `run`을 호출한 시점에 시작된다.
 *
 * **실행 순서**
 * - 작업은 추가된 순서대로 실행된다. 즉, FIFO(선입선출)를 따른다.
 * - 각 작업의 완료 시간이 달라도 순서는 완료 시간이 아닌 등록 순서를 따른다.
 * - 동시에 실행되는 작업은 항상 1개를 초과하지 않는다.
 *
 * **실패 처리**
 * - 작업이 반환한 Promise가 거부되어도 오류는 별도 처리 없이 무시한다.
 * - 어떤 작업이 실패해도 큐는 중단되지 않고 남은 작업을 계속 처리한다.
 *
 * @example
 * ```ts
 * const queue = new SequentialTaskQueue();
 * queue.enqueue(() => fetch("/a"));
 * queue.enqueue(() => fetch("/b"));
 * await queue.run();
 * ```
 */
export class SequentialTaskQueue<Task extends AsyncTask = AsyncTask> {
  /** 현재 대기열 큐 */
  private queue: Task[];
  /** run 중복 방지 */
  private isRunning: boolean;

  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  enqueue(task: Task) {
    this.queue.push(task);
  }

  get size() {
    return this.queue.length;
  }

  async run(): Promise<void> {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    while (this.hasTask) {
      await this.runNextTask();
    }

    this.isRunning = false;
  }

  private get hasTask() {
    return this.queue.length > 0;
  }

  // 각 작업을 처리하는 함수
  private async runNextTask() {
    // 가장 오래된 작업 꺼내기
    const nextTask = this.queue.shift();

    try {
      await nextTask();
    } catch {
      /** 실패했을 때 처리 */
    }
  }
}
