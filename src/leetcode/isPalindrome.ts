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

  if (x < 10) {
    return true;
  }

  return reverseInteger(x) === x;
}

// 정수를 뒤집는 역할
function reverseInteger(value: number): number {
  let remainingValue = value;
  let reversedValue = 0;

  while (remainingValue > 0) {
    const remainder = remainingValue % 10;

    reversedValue = reversedValue * 10 + remainder;
    remainingValue = Math.floor(remainingValue / 10);
  }

  return reversedValue;
}

/**
 * 목적:
 * 주어진 숫자를 뒤집었을 때, 원래의 값과 같은지 판별하는 함수 구현 (팰린드롬)
 *
 * 입력:
 * `-2^31 <= x <= 2^31 - 1`
 * 음수~양수
 *
 * 처리:
 * 정수를 문자열로 변환하지 않고 어떻게 할 수 있을까?
 * 만약 값이 1231 이라면?
 * 맨 뒷자리를 가져와야함, 음.. 이건 % 10으로 해결될 것 같아
 * 1231 % 10 => 1
 * 123 % 10 => 3
 * 12 % 10 => 2
 * 1 % 10 => 1
 *
 * 일단 while문으로 처리하고, 원본 정수를 변수에 담아서 처리
 * 1, 3, 2, 1 나머지 값을 어떻게 이어붙일 수 있을까?
 * (AI 힌트)
 * 1 * 10 = 10
 * 10 + 3 = 13
 * 13 * 10 = 130
 * 130 + 2 = 132
 * 132 * 10 = 1320
 * 1320 + 1 = 1321
 * ---
 * (1 + 0) * 10 = 10
 * (10 + 3) * 10 = 130
 * (130 + 2) * 10 = 1320
 * (1320 + 1) * 10 = 13210
 * (누적값 + 나머지값) * 10
 *
 * 마지막에는 / 10을 나눈 값을 원본 x와 비교
 *
 * 출력:
 * boolean
 *
 * 예외 케이스:
 * - 음수인 경우 "-" 부호가 붙기 때문에 false 처리
 * - 일의 자리수는 뒤집어도 결과가 같다
 */
