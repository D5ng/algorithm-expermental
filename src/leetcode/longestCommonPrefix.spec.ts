import { describe, expect, it } from "vitest";

import { longestCommonPrefix } from "./longestCommonPrefix";

describe("longestCommonPrefix", () => {
  it("모든 문자열이 공유하는 가장 긴 접두사를 반환한다", () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
  });

  it("공통 접두사가 없으면 빈 문자열을 반환한다", () => {
    expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
  });

  it("공통 접두사가 없으면 빈 문자열을 반환한다", () => {
    expect(longestCommonPrefix(["", "", ""])).toBe("");
  });

  it("모든 문자열이 완전히 같으면 그 문자열 전체를 반환한다", () => {
    expect(longestCommonPrefix(["flow", "flow", "flow"])).toBe("flow");
  });
});
