/**
 * LeetCode 14. 가장 긴 공통 접두사 (Longest Common Prefix)
 *
 * 문자열 배열이 주어졌을 때, 그 배열에 속한 모든 문자열들에서 공통으로 나타나는
 * 가장 긴 접두사(prefix) 문자열을 찾는 함수를 작성하라.
 *
 * 공통 접두사가 존재하지 않는다면 빈 문자열 `""`을 반환한다.
 *
 * @example
 * ```ts
 * longestCommonPrefix(["flower", "flow", "flight"]); // "fl"
 * ```
 * 세 문자열 모두 `fl`로 시작한다. 세 번째 글자는 `o`, `o`, `i`로 갈리기 때문에
 * 공통 접두사는 `fl`까지다.
 *
 * @example
 * ```ts
 * longestCommonPrefix(["dog", "racecar", "car"]); // ""
 * ```
 * 첫 글자부터 `d`, `r`, `c`로 서로 다르다. 입력 문자열들 사이에 공통 접두사가 없다.
 *
 * 제약 조건:
 * - `1 <= strs.length <= 200`
 * - `0 <= strs[i].length <= 200`
 * - `strs[i]`가 비어있지 않다면, 소문자 영어 알파벳으로만 이루어져 있다.
 *
 * 힌트:
 * 배열 안에 빈 문자열 `""`이 포함될 수 있다는 조건(`strs[i].length`가 0일 수 있음)과,
 * "비어있지 않다면 소문자로만 구성된다"는 조건은 서로 충돌하지 않지만 헷갈리기 쉬운
 * 부분이라 토론 탭에서도 자주 지적되고 있다.
 * 빈 문자열이 배열에 하나라도 있으면 모든 문자열의 공통 접두사는 자동으로 `""`이 된다는
 * 점을 염두에 두면 구현이 수월해질 것이다.
 */

export function longestCommonPrefix(strs: string[]): string {
  for (let charIndex = 0; charIndex < strs[0].length; charIndex++) {
    const baseChar = strs[0][charIndex];

    for (let strIndex = 0; strIndex < strs.length; strIndex++) {
      if (baseChar !== strs[strIndex][charIndex]) {
        return strs[strIndex].slice(0, charIndex);
      }
    }
  }

  return strs[0];
}

/* 문자열을 이어붙이는 방식 */
export function longestCommonPrefix2(strs: string[]): string {
  let commonPrefix = "";
  let matched = "";

  for (let charIndex = 0; charIndex < strs[0].length; charIndex++) {
    const baseChar = strs[0][charIndex];

    for (let strIndex = 0; strIndex < strs.length; strIndex++) {
      if (baseChar === strs[strIndex][charIndex]) {
        matched += baseChar;
      }
    }

    if (baseChar.repeat(strs.length) === matched) {
      commonPrefix += baseChar;
    } else {
      return commonPrefix;
    }

    matched = "";
  }

  return commonPrefix;
}

/**
 * 목적:
 * 가장 긴 공통 접두사를 출력한다
 *
 * 입력:
 * 문자열로 이루어진 배열
 * `1 <= strs.length <= 200`
 * `0 <= strs[i].length <= 200`
 *
 * 출력:
 * 공통 접두사 문자열
 *
 * 흐름:
 * 처음 문자열의 인덱스와 strs 배열의 인덱스로 구하면 어떨까?
 * [flower, flow, flight] 기준
 * f l o w e r
 * f l o w
 * f l i g h t
 *
 * index = 0, position = 0 => f
 * index = 1, position = 0 => f
 * index = 2, position = 0 => f
 *
 * index = 0, position = 1 => l
 * index = 1, position = 1 => l
 * index = 2, position = 1 => l
 *
 * index = 0, position = 2 => o
 * index = 1, position = 2 => o
 * index = 2, position = 2 => i
 *
 * 처리:
 * 기준으로 삼을 문자열 strs[0][charIndex]
 * 기준 문자열이 다른 문자열의 인덱스와 같은지 판별
 * 시작부터 값이 같아야하는데 같지 않은 경우에는 문자열 자르고 return
 * 모든 문자열이 같다면 조건식에 만족하지 않기에 strs[0]을 return
 *
 * 복잡도:
 * n: 배열의 길이
 * m: 문자열의 길이
 * 시간 복잡도: O(n*m)
 * 공간 복잡도: O(m)
 *
 * 엣지 케이스:
 * - 빈 문자열이 배열에 하나라도 있다면 공통 접두사는 ""으로 처리한다
 * - 모든 문자열이 같다면 그 중 하나를 반환한다
 * - 배열의 길이가 1일 때 문자열 그대로 반환한다
 */
