import { describe, it, expect } from "vitest";
import { curriedJoin } from "./curry";

describe("curry 유틸 함수", () => {
  it("파라미터 3개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
  });

  it("파라미터 2개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
  });

  it("파라미터 1개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  it("파라미터 1개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1)(2)(3)).toBe("1_2_3");
  });
});
