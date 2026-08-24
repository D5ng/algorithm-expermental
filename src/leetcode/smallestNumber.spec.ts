import { describe, expect, it } from "vitest"

import { smallestNumber } from "./smallestNumber"

describe("smallestNumber", () => {
	it("이미 n의 자릿수 곱이 t로 나누어떨어지면 n을 반환한다", () => {
		expect(smallestNumber(10, 2)).toBe(10)
		expect(smallestNumber(22, 4)).toBe(22)
	})

	it("n이 조건을 만족하지 않으면 조건을 만족하는 다음 수를 반환한다", () => {
		expect(smallestNumber(15, 3)).toBe(16)
		expect(smallestNumber(23, 5)).toBe(25)
	})

	it("t가 1이면 모든 자릿수 곱이 나누어떨어지므로 n을 반환한다", () => {
		expect(smallestNumber(1, 1)).toBe(1)
		expect(smallestNumber(100, 1)).toBe(100)
	})

	it("자릿수에 0이 포함되면 자릿수 곱이 0이므로 조건을 만족한다", () => {
		expect(smallestNumber(1, 10)).toBe(10)
		expect(smallestNumber(99, 10)).toBe(100)
	})
})
