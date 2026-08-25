import { describe, expect, it } from "vitest";

import { longestCommonPrefix } from "./longestCommonPrefix";

describe("longestCommonPrefix", () => {
  it("모든 문자열이 공유하는 가장 긴 접두사를 반환한다", () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
    expect(longestCommonPrefix(["abcde", "abcyz", "abzzz"])).toBe("ab");
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

  it("공통 접두사가 끊긴 뒤 우연히 다시 일치해도 이어붙이지 않는다", () => {
    expect(longestCommonPrefix(["abcd", "abxd", "abcd", "abzd"])).toBe("ab");
  });

  it("배열의 문자열 요소가 하나만 있는 경우 해당 문자열을 반환한다", () => {
    expect(longestCommonPrefix(["a"])).toBe("a");
  });
});
