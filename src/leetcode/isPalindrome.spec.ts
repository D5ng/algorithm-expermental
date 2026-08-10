import { describe, expect, it } from "vitest";

import { isPalindrome } from "./isPalindrome";

describe("isPalindrome", () => {
  it("앞뒤로 읽은 결과가 같으면 true를 반환한다", () => {
    expect(isPalindrome(121)).toBe(true);
    expect(isPalindrome(1221)).toBe(true);
    expect(isPalindrome(12321)).toBe(true);
  });

  it("앞뒤로 읽은 결과가 다르면 false를 반환한다", () => {
    expect(isPalindrome(123)).toBe(false);
    expect(isPalindrome(1231)).toBe(false);
  });

  describe("음수인 경우", () => {
    it("부호 때문에 뒤집은 결과가 달라지므로 팰린드롬이 아니다", () => {
      expect(isPalindrome(-121)).toBe(false);
    });

    it("한 자리 음수도 팰린드롬이 아니다", () => {
      expect(isPalindrome(-1)).toBe(false);
      expect(isPalindrome(-7)).toBe(false);
    });
  });

  describe("한 자리 수인 경우", () => {
    it("0은 팰린드롬이다", () => {
      expect(isPalindrome(0)).toBe(true);
    });

    it("1부터 9까지는 모두 팰린드롬이다", () => {
      expect(isPalindrome(7)).toBe(true);
      expect(isPalindrome(9)).toBe(true);
    });
  });

  describe("0으로 끝나는 수인 경우", () => {
    it("10은 뒤집으면 01이므로 팰린드롬이 아니다", () => {
      expect(isPalindrome(10)).toBe(false);
    });

    it("0이 여러 개 붙어도 팰린드롬이 아니다", () => {
      expect(isPalindrome(100)).toBe(false);
      expect(isPalindrome(1000021)).toBe(false);
    });
  });

  describe("32비트 정수 경계 근처인 경우", () => {
    it("경계에 가까운 팰린드롬도 올바르게 판별한다", () => {
      expect(isPalindrome(2147447412)).toBe(true);
    });

    it("최댓값과 최솟값은 팰린드롬이 아니다", () => {
      expect(isPalindrome(2147483647)).toBe(false);
      expect(isPalindrome(-2147483648)).toBe(false);
    });
  });
});
