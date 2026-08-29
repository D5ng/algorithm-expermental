import { describe, expect, it } from "vitest"

import { integerToRoman } from "./integer-to-roman"

describe("integerToRoman", () => {
	it("주어진 예시를 로마 숫자로 변환한다", () => {
		expect(integerToRoman(123)).toBe("CXXIII")
		expect(integerToRoman(1999)).toBe("MCMXCIX")
		expect(integerToRoman(3420)).toBe("MMMCDXX")
	})
})
