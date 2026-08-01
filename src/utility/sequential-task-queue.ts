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
    return this.size > 0;
  }

  // 각 작업을 처리하는 함수
  private async runNextTask() {
    // 가장 오래된 작업 꺼내기
    const nextTask = this.queue.shift();

    try {
      await nextTask();
    } catch {
      /* NOTE: 요구사항에서는 실패해도 다음 작업을 이어가도록 함 */
    }
  }
}
