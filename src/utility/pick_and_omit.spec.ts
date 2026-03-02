import { describe, expect, it } from "vitest";
import { omit, pick } from "./pick_and_omit";

describe("pick & omit 유틸리티 함수 테스트", () => {
	const user = { id: 1, name: "Gemini", email: "ai@google.com", age: 25 };

	describe("pick 유틸리티 함수 테스트", () => {
		it("pick 함수는 주어진 키에 대한 값을 반환해야 한다.", () => {
			const picked = pick(user, ["name", "email"]);
			expect(picked).toEqual({ name: "Gemini", email: "ai@google.com" });
		});

		it("pick 함수는 존재하지 않는 키를 무시해야 한다.", () => {
			const picked = pick(user, ["name", "email", "nonExist" as any]);
			expect(picked).toEqual({ name: "Gemini", email: "ai@google.com" });
		});

		it("pick 함수는 원본 객체를 변경하지 않아야 한다. (불변성 체크)", () => {
			const picked = pick(user, ["name", "email"]);
			expect(user !== picked).toBe(true);
		});
	});

	describe("omit 유틸리티 함수 테스트", () => {
		it("omit 함수는 주어진 키에 대한 값을 제외해야 한다.", () => {
			const omitted = omit(user, ["age", "email"]);
			expect(omitted).toEqual({ id: 1, name: "Gemini" });
		});

		it("omit 함수는 존재하지 않는 키를 무시해야 한다.", () => {
			const omitted = omit(user, ["age", "email", "nonExist" as any]);
			expect(omitted).toEqual({ id: 1, name: "Gemini" });
		});

		it("omit 함수는 원본 객체를 변경하지 않아야 한다. (불변성 체크)", () => {
			const omitted = omit(user, ["age", "email"]);
			expect(user !== omitted).toBe(true);
		});
	});
});
