import { describe, expect, it } from "vitest";
import { cloneDeepStack } from "./clone-deep-stack";

describe("cloneDeep", () => {
  it("원시 타입은 그대로 반환한다", () => {
    expect(cloneDeepStack(1)).toBe(1);
    expect(cloneDeepStack("text")).toBe("text");
    expect(cloneDeepStack(true)).toBe(true);
    expect(cloneDeepStack(null)).toBeNull();
    expect(cloneDeepStack(undefined)).toBeUndefined();
  });

  it("중첩 객체를 깊은 복사한다", () => {
    const source = { a: 1, nested: { b: 2 } };

    const cloned = cloneDeepStack(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);
    expect(cloned.nested).not.toBe(source.nested);

    cloned.nested.b = 100;
    expect(source.nested.b).toBe(2);
  });

  it("배열과 배열 내부 객체를 깊은 복사한다", () => {
    const source = [1, { a: 1 }, [2, { b: 2 }]];

    const cloned = cloneDeepStack(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);
    expect(cloned[1]).not.toBe(source[1]);
    expect(cloned[2]).not.toBe(source[2]);
  });
});
