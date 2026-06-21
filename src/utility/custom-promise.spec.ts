import { describe, expect, it, vi } from "vitest";
import { CustomPromise } from "./custom-promise";

/** microtask 큐가 한 tick 진행될 때까지 대기 */
function flushMicrotasks(): Promise<void> {
  return new Promise((resolve) => queueMicrotask(resolve));
}

describe("custom Promise", () => {
  it("resolve되면 then 콜백에 값이 전달되어야 한다", async () => {
    const onFulfilled = vi.fn();
    const promise = new CustomPromise<number>((resolve) => resolve(42));

    promise.then(onFulfilled);
    await flushMicrotasks();

    expect(onFulfilled).toHaveBeenCalledOnce();
    expect(onFulfilled).toHaveBeenCalledWith(42);
  });

  it("reject되면 catch 콜백에 reason이 전달되어야 한다", async () => {
    const onRejected = vi.fn();
    const error = new Error("failed");
    const promise = new CustomPromise((_resolve, reject) => reject(error));

    promise.catch(onRejected);
    await flushMicrotasks();

    expect(onRejected).toHaveBeenCalledOnce();
    expect(onRejected).toHaveBeenCalledWith(error);
  });

  it("then은 항상 새로운 Promise를 반환해야 한다", () => {
    const promise = new CustomPromise<number>((resolve) => resolve(1));
    const next = promise.then((value) => value + 1);

    console.log("promise", promise);
    console.log("next", next);

    expect(next).not.toBe(promise);
    expect(next).toBeInstanceOf(CustomPromise);
  });

  it("then을 연속 호출하면 이전 반환값이 다음 then에 전달되어야 한다", async () => {
    const promise = new CustomPromise<number>((resolve) => resolve(1))
      .then((value) => value + 1)
      .then((value) => value * 2);

    await expect(promise).resolves.toBe(4);
    console.log(promise);
  });

  it("then 콜백은 microtask에서 비동기로 실행되어야 한다", async () => {
    const onFulfilled = vi.fn();
    new CustomPromise<number>((resolve) => resolve(1)).then(onFulfilled);

    expect(onFulfilled).not.toHaveBeenCalled();

    await flushMicrotasks();

    expect(onFulfilled).toHaveBeenCalledOnce();
  });

  it("catch 콜백은 microtask에서 비동기로 실행되어야 한다", async () => {
    const onRejected = vi.fn();
    new CustomPromise((_resolve, reject) => reject("err")).catch(onRejected);

    expect(onRejected).not.toHaveBeenCalled();

    await flushMicrotasks();

    expect(onRejected).toHaveBeenCalledOnce();
  });
});
