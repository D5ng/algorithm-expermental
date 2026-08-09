import { describe, it, expect } from "vitest";
import { curriedJoin } from "./curry";

describe("curry 유틸 함수", () => {
  it("매개변수 3개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
  });

  it("매개변수 2개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
  });

  it("매개변수 1개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1)(2)(3)).toBe("1_2_3");
  });

  describe("인수가 매개변수 개수를 초과하는 경우", () => {
    it("한 번에 초과 전달 시 초과분은 무시된다", () => {
      expect(curriedJoin(1, 2, 3, 4)).toBe("1_2_3");
    });

    it("나눠서 전달하다 마지막에 초과해도 초과분은 무시된다", () => {
      expect(curriedJoin(1)(2, 3, 4)).toBe("1_2_3");
    });

    it("2개 전달 후 초과 전달해도 초과분은 무시된다", () => {
      expect(curriedJoin(1, 2)(3, 4)).toBe("1_2_3");
    });
  });
});
