type PromiseStatus = "pending" | "fulfilled" | "rejected";

type OnFulfilled<T, R> = (value: T) => R | PromiseLike<R>;
type PromiseReject = (reason?: unknown) => void;

type Executor<T> = (
  resolve: (value: T) => void,
  rejected: PromiseReject,
) => void;

export class CustomPromise<T> {
  status: PromiseStatus;
  result: undefined | T;

  constructor(executor: Executor<T>) {
    this.status = "pending";
    this.result = undefined;

    executor(
      (resolve) => this.resolve(resolve),
      (reject) => this.reject(reject),
    );
  }

  then<R>(onFulfilled: OnFulfilled<T, R>, onRejected?: PromiseReject) {
    return new CustomPromise<T>((resolve, reject) => {
      queueMicrotask(() => {
        if (this.status === "fulfilled") {
          const result = onFulfilled(this.result) as T;
          resolve(result);
        }

        if (this.status === "rejected") {
          const result = onRejected(this.result);
          reject(result);
        }
      });
    });
  }

  catch(onRejected: PromiseReject) {
    return this.then(() => {}, onRejected);
  }

  private resolve(value: T) {
    this.status = "fulfilled";
    this.result = value;
  }

  private reject(reason?: unknown) {
    this.status = "rejected";
    this.result = reason as T;
  }

  static resolve() {}

  static reject() {}
}

/**
 * executor => 함수를 전달 받는다. 함수에서는 resolve, reject 매개변수들이 있고, 이것또한 함수다
 * new Promise((resolve) => resolve(1)); => 이 자체도 Promise를 반환해야함
 */
const promise = new Promise((resolve) => resolve(1));
const result = promise.then((value) => console.log(value));
console.log("찐 Promise", result);
