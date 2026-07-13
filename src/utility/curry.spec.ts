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
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  it("매개변수 1개 전달 시 정상 동작하는지 테스트", () => {
    expect(curriedJoin(1)(2)(3)).toBe("1_2_3");
  });
});
