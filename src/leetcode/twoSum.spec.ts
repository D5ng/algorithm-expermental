import { describe, expect, it } from "vitest"

import { twoSum } from "./twoSum"

describe("twoSum", () => {
	it("합이 target이 되는 두 원소의 인덱스를 반환한다", () => {
		expect(twoSum([2, 7, 11, 15], 9).sort()).toEqual([0, 1])
	})

	it("정답의 두 원소가 배열에서 떨어져 있어도 올바른 인덱스를 반환한다", () => {
		expect(twoSum([3, 2, 4], 6).sort()).toEqual([1, 2])
	})

	it("값이 같더라도 서로 다른 위치의 원소를 사용할 수 있다", () => {
		expect(twoSum([3, 3], 6).sort()).toEqual([0, 1])
	})

	it("음수가 포함된 배열에서도 올바른 인덱스를 반환한다", () => {
		expect(twoSum([-3, 4, 3, 90], 0).sort()).toEqual([0, 2])
	})
})
