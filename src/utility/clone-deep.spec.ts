import { describe, expect, it } from "vitest";
import { cloneDeep } from "./clone-deep";

describe("cloneDeep", () => {
	it("원시 타입은 그대로 반환한다", () => {
		expect(cloneDeep(1)).toBe(1);
		expect(cloneDeep("text")).toBe("text");
		expect(cloneDeep(true)).toBe(true);
		expect(cloneDeep(null)).toBeNull();
		expect(cloneDeep(undefined)).toBeUndefined();
	});

	it("중첩 객체를 깊은 복사한다", () => {
		const source = { a: 1, nested: { b: 2 } };

		const cloned = cloneDeep(source);

		expect(cloned).toEqual(source);
		expect(cloned).not.toBe(source);
		expect(cloned.nested).not.toBe(source.nested);

		cloned.nested.b = 100;
		expect(source.nested.b).toBe(2);
	});

	it("배열과 배열 내부 객체를 깊은 복사한다", () => {
		const source = [1, { a: 1 }, [2, { b: 2 }]];

		const cloned = cloneDeep(source);

		expect(cloned).toEqual(source);
		expect(cloned).not.toBe(source);
		expect(cloned[1]).not.toBe(source[1]);
		expect(cloned[2]).not.toBe(source[2]);
	});

	it("Date 인스턴스를 복제하되 같은 참조는 아니어야 한다", () => {
		const date = new Date();
		const source = { createdAt: date };

		const cloned = cloneDeep(source);

		expect(cloned.createdAt).not.toBe(source.createdAt);
		expect(cloned.createdAt.getTime()).toBe(source.createdAt.getTime());
	});

	it("RegExp 인스턴스를 복제하되 같은 참조는 아니어야 한다", () => {
		const reg = /abc/gi;
		const source = { pattern: reg };

		const cloned = cloneDeep(source);

		expect(cloned.pattern).not.toBe(source.pattern);
		expect(cloned.pattern.source).toBe(source.pattern.source);
		expect(cloned.pattern.flags).toBe(source.pattern.flags);
	});

	it("순환 참조가 있는 객체도 안전하게 깊은 복사한다", () => {
		// biome-ignore lint/suspicious/noExplicitAny: 어떤 데이터 타입의 객체로 들어올지 예측할 수 없음
		const source: Record<string, any> = { tag: "circle" };
		source.self = source;

		const cloned = cloneDeep(source);

		expect(cloned).not.toBe(source);
		expect(cloned.tag).toBe("circle");
		expect(cloned.self).toBe(cloned);
		expect(cloned.self).not.toBe(source);
	});
});
