/**
 * LeetCode 9. 팰린드롬 숫자 (Palindrome Number)
 *
 * 정수 `x`가 주어졌을 때, `x`가 팰린드롬이면 `true`를, 그렇지 않으면 `false`를 반환한다.
 *
 * 팰린드롬은 앞에서부터 읽은 결과와 뒤에서부터 읽은 결과가 같은 것을 의미한다.
 *
 * @example
 * ```ts
 * isPalindrome(121); // true
 * ```
 * `121`은 왼쪽에서 오른쪽으로 읽어도, 오른쪽에서 왼쪽으로 읽어도 `121`이다.
 *
 * @example
 * ```ts
 * isPalindrome(-121); // false
 * ```
 * 왼쪽에서 오른쪽으로 읽으면 `-121`이지만, 반대 방향으로 읽으면 `121-`이 된다.
 * 따라서 팰린드롬이 아니다.
 *
 * @example
 * ```ts
 * isPalindrome(10); // false
 * ```
 * 오른쪽에서 왼쪽으로 읽으면 `01`이 된다. 따라서 팰린드롬이 아니다.
 *
 * 제약 조건:
 * - `-2^31 <= x <= 2^31 - 1`
 *
 * 추가 도전 과제:
 * 정수를 문자열로 변환하지 않고도 이 문제를 해결할 수 있을까?
 *
 * 힌트:
 * 정수를 뒤집을 때 숫자 범위를 초과하는 오버플로에 주의하자.
 * 다만 JavaScript의 `number`는 배정밀도 실수라 `2^31` 근처에서는 넘치지 않는다.
 * 오버플로는 정수 폭이 고정된 언어(C++, Java 등)에서 생기는 문제이므로,
 * 여기서는 자릿수를 어떻게 다룰지에 집중하면 된다.
 */

export function isPalindrome(x: number): boolean {
  if (x < 0) {
    return false;
  }

  const reverseChar = Number(String(x).split("").reverse().join(""));
  return reverseChar === x;
}

/**
 * 목적:
 *
 * 입력:
 *
 * 처리:
 * 가장 간단한 방법:
 * 문자열로 변환하여 `reverse` 사용
 *
 * 숫자에 맨 앞, 뒤를 비교하는 방식
 *
 *
 * 출력:
 *
 * 예외 케이스:
 * - 음수인 경우 "-" 기호로 인한 false
 */
