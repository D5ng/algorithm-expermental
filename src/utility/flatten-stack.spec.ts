import { describe, expect, it } from "vitest";
import { flattenStack } from "./flatten-stack";

describe("flatten", () => {
  const nestedArr = [1, [2, [3, [4]]], 5];

  it("depth를 넘겨주지 않았을 때 기본값 1로 한 단계만 평탄화한다", () => {
    const flatted = flattenStack(nestedArr);
    expect(flatted).toEqual([1, 2, [3, [4]], 5]);
  });

  it("depth가 2일 때 두 단계 평탄화한다", () => {
    const flatted = flattenStack(nestedArr, 2);
    expect(flatted).toEqual([1, 2, 3, [4], 5]);
  });

  it("depth가 Infinity일 때 모든 중첩 배열을 평탄화한다", () => {
    const flatted = flattenStack(nestedArr, Infinity);
    expect(flatted).toEqual([1, 2, 3, 4, 5]);
  });
});
