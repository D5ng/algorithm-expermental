type PromiseStatus = "pending" | "fulfilled" | "rejected"

type PromiseState<T> = { status: "pending" } | { status: "fulfilled"; value: T } | { status: "rejected"; reason: unknown }

type OnFulfilled<T, R> = (value: T) => R | PromiseLike<R>
type PromiseReject = (reason?: unknown) => void

type Executor<T> = (resolve: (value: T) => void, rejected: PromiseReject) => void

export class CustomPromise<T> {
	private state: PromiseState<T>

	constructor(executor: Executor<T>) {
		this.state = { status: "pending" }

		executor(
			(resolve) => this.resolve(resolve),
			(reject) => this.reject(reject),
		)
	}

	get status(): PromiseStatus {
		return this.state.status
	}

	get result(): T | unknown | undefined {
		switch (this.state.status) {
			case "fulfilled":
				return this.state.value
			case "rejected":
				return this.state.reason
			default:
				return undefined
		}
	}

	// biome-ignore lint/suspicious/noThenProperty: 커스텀 Promise 구현이므로 thenable이 의도된 동작이다
	then<R>(onFulfilled: OnFulfilled<T, R>, onRejected?: PromiseReject) {
		return new CustomPromise<T>((resolve, reject) => {
			queueMicrotask(() => {
				if (this.state.status === "fulfilled") {
					const result = onFulfilled(this.state.value) as T
					resolve(result)
				}

				if (this.state.status === "rejected") {
					if (onRejected) {
						onRejected(this.state.reason)
					} else {
						reject(this.state.reason)
					}
				}
			})
		})
	}

	catch(onRejected: PromiseReject) {
		return this.then(() => {}, onRejected)
	}

	private resolve(value: T) {
		this.state = { status: "fulfilled", value }
	}

	private reject(reason?: unknown) {
		this.state = { status: "rejected", reason }
	}

	static resolve<T>(value: T): CustomPromise<T> {
		return new CustomPromise((resolve) => resolve(value))
	}

	static reject(reason?: unknown): CustomPromise<never> {
		return new CustomPromise((_, reject) => reject(reason))
	}
}
