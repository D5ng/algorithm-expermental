import { describe, expect, it } from "vitest";

import "./array-prototype-last";

describe("Array.prototype.last", () => {
	it("요소가 있으면 마지막 요소를 반환한다", () => {
		expect([null, {}, 3].last()).toBe(3);
	});

	it("빈 배열이면 -1을 반환한다", () => {
		expect([].last()).toBe(-1);
	});

	it("요소가 하나뿐이어도 그 요소를 반환한다", () => {
		expect([7].last()).toBe(7);
	});

	describe("모든 배열에서 호출할 수 있다", () => {
		it("서로 다른 배열이 각자의 마지막 요소를 반환한다", () => {
			expect([1, 2, 3].last()).toBe(3);
			expect(["a", "b"].last()).toBe("b");
			expect([true].last()).toBe(true);
		});

		it("JSON.parse로 만든 배열에서도 동작한다", () => {
			expect(JSON.parse("[1, 2, 3]").last()).toBe(3);
			expect(JSON.parse("[]").last()).toBe(-1);
		});
	});

	describe("마지막 요소가 falsy한 값인 경우", () => {
		it("마지막 요소가 null이면 -1이 아니라 null을 반환한다", () => {
			expect([1, null].last()).toBe(null);
		});

		it("마지막 요소가 0이면 0을 반환한다", () => {
			expect([1, 0].last()).toBe(0);
		});

		it("마지막 요소가 빈 문자열이면 빈 문자열을 반환한다", () => {
			expect([1, ""].last()).toBe("");
		});

		it("마지막 요소가 false면 false를 반환한다", () => {
			expect([1, false].last()).toBe(false);
		});
	});

	it("마지막 요소가 참조 타입이면 원본과 같은 참조를 반환한다", () => {
		const lastElement = { id: 1 };

		expect([{}, lastElement].last()).toBe(lastElement);
	});

	it("호출해도 원본 배열이 변하지 않는다", () => {
		const nums = [1, 2, 3];

		nums.last();

		expect(nums).toEqual([1, 2, 3]);
	});
});
