type AsyncTask = () => Promise<unknown>;

export class SequentialTaskQueue {
  // 작업 대기열 큐
  private taskQueue: AsyncTask[];
  private isRunning: boolean;
  private isTaskRunning: boolean;

  constructor() {
    this.taskQueue = [];
    this.isRunning = false;
    this.isTaskRunning = false;
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
    // 작업이 실행되면 중복 호출 방지
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    // 대기열에 등록된 작업이 없을 때 까지 반복
    // 작업의 상태가 진행중이지 않을 때만 실행하도록 개선 가능할듯?
    while (this.taskQueue.length > 0 && !this.isTaskRunning) {
      this.isTaskRunning = true;

      // 작업 대기열에서 가장 오래된 함수를 꺼내기
      const queue = this.taskQueue.shift();

      console.log("무한 실행?");

      // 각 작업들이 성공, 실패와 상관없이 진행하도록 구현
      await queue()
        .then(() => {
          console.log(`result`);
        })
        .catch((reject) => {
          console.log(`reject: ${reject}`);
        })
        .finally(() => {
          this.isTaskRunning = false;
        });

      // 더 이상 실행할 작업 대기열이 없다면 실행 중이 아닌 상태로 변경
      if (queue.length === 0) {
        this.isRunning = false;
      }
    }
  }

  get size(): number {
    return this.taskQueue.length;
  }
}
