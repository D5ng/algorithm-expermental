import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { debounce } from "./debounce"

describe("Debounce 구현체 검증 (Vitest)", () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.restoreAllMocks()
		vi.useRealTimers()
	})

	it("지연 시간(delay)이 지나기 전에는 콜백이 실행되지 않아야 한다", () => {
		const callback = vi.fn()
		const debounced = debounce(callback, 200)

		debounced()
		debounced()
		debounced()

		vi.advanceTimersByTime(199)
		expect(callback).not.toHaveBeenCalled()

		vi.advanceTimersByTime(1)
		expect(callback).toHaveBeenCalledTimes(1)
	})

	it("마지막으로 호출될 때 전달된 인자가 콜백에 전달되어야 한다", () => {
		const callback = vi.fn()
		const debounced = debounce(callback, 100)

		debounced("first")
		debounced("second")
		debounced("third")

		vi.runAllTimers()

		expect(callback).toHaveBeenCalledWith("third")
		expect(callback).toHaveBeenCalledTimes(1)
	})

	it("this 바인딩이 호출 시점의 컨텍스트를 유지해야 한다", () => {
		const user = {
			name: "SeniorDev",
			greet: debounce(function (this: { name: string }) {
				return this.name
			}, 100),
		}

		const spy = vi.spyOn(user, "greet")

		user.greet()
		vi.runAllTimers()

		expect(spy).toReturn
	})
})
