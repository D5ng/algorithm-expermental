// 지정된 최대 동시 실행 개수 제한에 따라 비동기 작업의 실행을 관리하는 `AsyncTaskQueue` 클래스를 설계하고 구현하세요.

// 작업 큐는 다음 조건을 만족해야 합니다.

// * 작업은 추가된 순서대로 실행되어야 합니다. 즉, FIFO(선입선출)를 따라야 합니다.
// * 동시에 실행되는 작업의 수는 지정된 최대 동시 실행 개수를 초과해서는 안 됩니다.
// * 작업이 반환한 Promise가 거부되더라도 해당 오류는 별도의 처리 없이 무시해야 합니다.
// * 어떤 작업이 실패하더라도 큐는 중단되지 않고 남아 있는 작업을 계속 처리해야 합니다.

type AsyncTask = () => Promise<unknown>;

export class AsyncTaskQueue<Task extends AsyncTask = AsyncTask> {
  /** 최대 동시 실행 수 */
  private concurrency: number;
  /** 실행중인 작업 개수 */
  private runningTaskCount: number;
  /** 대기중인 작업 큐 */
  private pendingQueue: Task[];

  constructor(concurrency: number) {
    // Initialize the queue with the specified concurrency limit
    this.concurrency = concurrency;
    this.runningTaskCount = 0;
    this.pendingQueue = [];
  }

  async queue(task: Task) {
    // Add an async task to the queue
    // 현재 실행중인 작업 개수가 최대 동시 작업 수보다 같거나 크면 무시
    if (this.hasReachedConcurrencyLimit()) {
      this.pendingQueue.push(task);
      return;
    }

    // 현재 실행중인 작업의 개수를 증가
    this.runningTaskCount += 1;

    // task가 동기적인 상황에서의 예외처리
    try {
      await task();
    } catch (error) {
      /** 에러 발생 */
    } finally {
      // 작업이 끝났다면 현재 실행 중인 작업 감소
      this.runningTaskCount -= 1;

      // 가장 오래된 함수(작업) 가져오기
      const nextTask = this.pendingQueue.shift();

      // 가장 오래된 작업이 없다면 종료
      if (nextTask === undefined) {
        return;
      }

      // 가장 오래된 함수가 있다면 똑같은 방법으로 반복
      this.queue(nextTask);
    }
  }

  /**
   * 현재 실행중인 작업 개수가 최대 동시 작업 수보다 같은지 판별
   * @returns boolean
   */
  private hasReachedConcurrencyLimit() {
    return this.runningTaskCount >= this.concurrency;
  }
}

/**
 * 요구사항 분석하기
 *
 * 목적:
 * 최대 동시 개수만큼 비동기 작업을 실행하는 클래스
 *
 * 흐름:
 * 최대 동시 개수가 2로 가정
 *
 * [task1] 실행
 * [task1, task2] task2 실행
 * 실행중인_작업_개수가 최대 동시 실행 개수 판별
 * 만약 실행중인 작업 개수가 최대 동시 실행 개수와 같거나 작으면 그대로 실행
 * 만약 실행중인 작업 개수가 최대 동시 실행 개수보다 크다면 대기열에 추가
 * task3 대기열에 추가
 * task1 작업이 끝나면, task3이 추가되어야함
 * [task2, task3]
 * task2 작업 종료
 * task3 작업 종료
 *
 * 필요한 데이터 구분:
 * 최대 동시 실행 개수
 * 실행중인 작업 개수
 * 대기중인 큐
 * 실행중인 작업 개수가 최대 동시 실행 개수보다 큰지 (파생 데이터)
 *
 * queue
 * 입력:
 * 비동기 작업
 *
 * 처리:
 * [동시 실행 수가 2일 때]
 * 실행중인 작업 개수와 최대 동시 실행 수 판별
 * 실행중인 작업 수가 최대 동시 실행 수보다 크다면 대기열에 추가
 * task1 작업 실행 (실행중인 작업 수 1씩 증가)
 * task1 함수를 호출하면 비동기 타이머 함수를 반환함
 * task2 작업 실행 (실행중인 작업 수 1씩 증가)
 * task2 함수를 호출하면 비동기 타이머 함수를 반환함
 * task3 작업 실행
 */
