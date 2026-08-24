import { describe, expect, it } from "vitest"

import { romanToInt } from "./romanToInt"

describe("romanToInt", () => {
	it("기호가 하나면 그 기호의 값을 반환한다", () => {
		expect(romanToInt("I")).toBe(1)
		expect(romanToInt("V")).toBe(5)
		expect(romanToInt("M")).toBe(1000)
	})

	it("큰 값에서 작은 값 순으로 나열되면 모두 더한다", () => {
		expect(romanToInt("III")).toBe(3)
		expect(romanToInt("XII")).toBe(12)
		expect(romanToInt("XXVII")).toBe(27)
		expect(romanToInt("LVIII")).toBe(58)
	})

	it("작은 값이 큰 값 앞에 오면 빼서 계산한다", () => {
		expect(romanToInt("IV")).toBe(4)
		expect(romanToInt("IX")).toBe(9)
		expect(romanToInt("XL")).toBe(40)
		expect(romanToInt("XC")).toBe(90)
		expect(romanToInt("CD")).toBe(400)
		expect(romanToInt("CM")).toBe(900)
	})

	it("뺄셈 표기가 여러 번 섞여 있어도 올바르게 계산한다", () => {
		expect(romanToInt("MCMXCIV")).toBe(1994)
		expect(romanToInt("CDXLIV")).toBe(444)
		expect(romanToInt("MMXXIV")).toBe(2024)
	})

	it("같은 기호 앞뒤로 덧셈과 뺄셈이 함께 나와도 구분한다", () => {
		expect(romanToInt("XIV")).toBe(14)
		expect(romanToInt("XVI")).toBe(16)
		expect(romanToInt("XIX")).toBe(19)
	})

	it("제약 조건의 경계값을 처리한다", () => {
		expect(romanToInt("I")).toBe(1)
		expect(romanToInt("MMMCMXCIX")).toBe(3999)
	})
})
