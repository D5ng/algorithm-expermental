import { describe, expect, it } from "vitest"

import { integerToRoman } from "./integer-to-roman"

describe("integerToRoman", () => {
	it("기호 하나로 표현되는 값을 변환한다", () => {
		expect(integerToRoman(1)).toBe("I")
		expect(integerToRoman(5)).toBe("V")
		expect(integerToRoman(10)).toBe("X")
		expect(integerToRoman(1000)).toBe("M")
	})

	it("같은 기호를 여러 번 이어붙여 표현한다", () => {
		expect(integerToRoman(3)).toBe("III")
		expect(integerToRoman(30)).toBe("XXX")
		expect(integerToRoman(300)).toBe("CCC")
		expect(integerToRoman(3000)).toBe("MMM")
	})

	it("큰 값에서 작은 값 순으로 나열해 더한다", () => {
		expect(integerToRoman(6)).toBe("VI")
		expect(integerToRoman(12)).toBe("XII")
		expect(integerToRoman(27)).toBe("XXVII")
		expect(integerToRoman(58)).toBe("LVIII")
	})

	it("뺄셈 표기가 필요한 값을 변환한다", () => {
		expect(integerToRoman(4)).toBe("IV")
		expect(integerToRoman(9)).toBe("IX")
		expect(integerToRoman(40)).toBe("XL")
		expect(integerToRoman(90)).toBe("XC")
		expect(integerToRoman(400)).toBe("CD")
		expect(integerToRoman(900)).toBe("CM")
	})

	it("뺄셈 표기가 여러 번 섞여 있어도 올바르게 변환한다", () => {
		expect(integerToRoman(1994)).toBe("MCMXCIV")
		expect(integerToRoman(444)).toBe("CDXLIV")
		expect(integerToRoman(2024)).toBe("MMXXIV")
	})

	it("주어진 예시를 로마 숫자로 변환한다", () => {
		expect(integerToRoman(123)).toBe("CXXIII")
		expect(integerToRoman(1999)).toBe("MCMXCIX")
		expect(integerToRoman(3420)).toBe("MMMCDXX")
	})

	it("제약 조건의 경계값을 처리한다", () => {
		expect(integerToRoman(1)).toBe("I")
		expect(integerToRoman(3999)).toBe("MMMCMXCIX")
	})
})
