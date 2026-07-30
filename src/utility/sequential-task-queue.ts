type AsyncTask = () => Promise<unknown>;

export class SequentialTaskQueue {
  // 작업 대기열 큐
  private taskQueue: AsyncTask[];
  private isRunning: boolean;

  constructor() {
    this.taskQueue = [];
    this.isRunning = false;
  }
  /**
   * 큐를 추가할 수 있는 메서드
   * 입력: 새로 들어올 작업
   * 출력: 없음
   * @param task 새로 들어올 작업
   */
  enqueue(task: AsyncTask): void {
    this.taskQueue.push(task);
  }

  /**
   * 대기열 작업 큐를 실행하는 함수
   *
   * 입력: 없음
   *
   * 처리:
   * - 각 작업이 성공, 실패해도 모든 작업이 중단되지 않고 실행한다
   * - 중복으로 호출될 수 없다
   *
   * 출력: 없음
   *
   * 애매한 요구사항
   * - 작업이 모두 끝난 이후 호출 가능하도록 개선
   * @returns
   */
  async run(): Promise<void> {
    // task가 비어있거나, run 메서드가 진행 중 이라면
    if (!this.hasPendingTask() || this.isRunning) {
      return;
    }

    this.isRunning = true;

    // 대기열에 등록된 작업이 없을 때 까지 반복
    while (this.hasPendingTask()) {
      await this.processNextTask();
    }

    this.isRunning = false;
  }

  get size(): number {
    return this.taskQueue.length;
  }

  /**
   * 다음 작업을 처리하는 함수
   * 책임:
   * 대기열 큐에서 가장 오래된 작업을 꺼낸다
   * 작업이 없다면 무시한다
   * 작업을 실행한다
   * 작업이 실패하면 에러가 발생한다
   * @returns
   */
  private async processNextTask() {
    // 작업 대기열에서 가장 오래된 함수를 꺼내기
    const task = this.taskQueue.shift();

    if (typeof task === "undefined") {
      return;
    }

    // task 함수 실행 및 내부에서 에러가 발생했을 때를 대비
    try {
      await task();
    } catch (error) {
      console.error(`에러가 발생했어요: ${error}`);
    }
  }

  // 작업 큐가 비어있는지 판별
  // 작업이 비어있는지 판별하는것과 대기중인 작업이 있냐
  // 대기중인 작업이 비어있는지 vs 대기중이 작업이 있는지?
  // 긍정형이 조금 더 읽기 쉽다.
  private hasPendingTask() {
    return this.taskQueue.length > 0;
  }
}
