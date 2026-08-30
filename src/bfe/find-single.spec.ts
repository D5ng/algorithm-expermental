import { describe, expect, it } from "vitest"

import { findSingle } from "./find-single"

describe("findSingle", () => {
	it("한 번만 등장하는 정수를 반환한다", () => {
		expect(findSingle([10, 2, 2, 1, 0, 0, 10])).toBe(1)
	})

	it("하나의 숫자만 있다면 해당 값을 반환한다", () => {
		expect(findSingle([10])).toBe(10)
	})

	it("음수가 포함되어도 중복 없는 값을 반환한다", () => {
		expect(findSingle([1, -2, -2])).toBe(1)
	})
})
