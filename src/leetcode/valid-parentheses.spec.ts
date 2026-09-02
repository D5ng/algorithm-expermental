import { describe, expect, it } from "vitest"

import { isValid } from "./valid-parentheses"

describe("isValid", () => {
	it("짝이 맞는 괄호 하나는 유효하다", () => {
		expect(isValid("()")).toBe(true)
	})

	it("여러 종류의 괄호가 순서대로 닫히면 유효하다", () => {
		expect(isValid("()[]{}")).toBe(true)
	})

	it("여는 괄호와 닫는 괄호의 종류가 다르면 유효하지 않다", () => {
		expect(isValid("(]")).toBe(false)
	})

	it("중첩된 괄호가 올바른 순서로 닫히면 유효하다", () => {
		expect(isValid("([])")).toBe(true)
	})

	it("중첩된 괄호가 잘못된 순서로 닫히면 유효하지 않다", () => {
		expect(isValid("([)]")).toBe(false)
		expect(isValid("(}{)")).toBe(false)
		expect(isValid("[")).toBe(false)
	})
})
