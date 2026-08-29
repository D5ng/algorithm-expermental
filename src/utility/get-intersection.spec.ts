import { describe, expect, it } from "vitest"
import { getIntersection } from "./get-intersection"

describe("getIntersection", () => {
	it("두 배열에 공통으로 있는 문자열만 반환한다", () => {
		const result = getIntersection(["b", "a", "d", "c"], ["a", "b", "c"])

		expect(result.sort()).toEqual(["a", "b", "c"])
	})

	it("공통 요소가 없으면 빈 배열을 반환한다", () => {
		const result = getIntersection([1, 2, 3], [4, 5, 6])

		expect(result).toEqual([])
	})

	it("중복된 공통 요소는 한 번만 반환한다", () => {
		const result = getIntersection([1, 1, 2, 3, 3], [1, 1, 3, 3, 4])

		expect(result.sort()).toEqual([1, 3])
	})

	it("두 배열 중 빈 배열이 들어오면 빈 배열을 반환한다", () => {
		const result = getIntersection([], [1, 2, 3])

		expect(result.sort()).toEqual([])
	})

	it("배열에 empty 요소가 있다면 제거하고 공통 요소를 반환환다", () => {
		const result = getIntersection(
			// biome-ignore lint/suspicious/noSparseArray: 테스트 목적
			[1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 3, 3, 3, 3, 3, , 2, 2, 2],
			[2],
		)

		expect(result.sort()).toEqual([2])
	})
})
