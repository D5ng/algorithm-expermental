/**
 * LeetCode 3345. 조건을 만족하는 가장 작은 자릿수 곱 I
 *
 * 두 정수 `n`과 `t`가 주어졌을 때, 다음 조건을 만족하는 가장 작은 정수를 반환한다.
 *
 * - `n`보다 크거나 같다.
 * - 각 자릿수의 곱이 `t`로 나누어떨어진다.
 *
 * @example
 * ```ts
 * smallestNumber(10, 2); // 10
 * ```
 * 10의 자릿수 곱은 `1 × 0 = 0`이고, 0은 2로 나누어떨어진다.
 *
 * @example
 * ```ts
 * smallestNumber(15, 3); // 16
 * ```
 * 16의 자릿수 곱은 `1 × 6 = 6`이고, 6은 3으로 나누어떨어진다.
 *
 * 제약 조건:
 * - `1 <= n <= 100`
 * - `1 <= t <= 10`
 *
 * 힌트:
 * 조건을 만족하는 수는 최대 10번의 탐색 안에 찾을 수 있으므로,
 * `n`부터 수를 하나씩 확인하는 완전 탐색을 사용할 수 있다.
 */

export function smallestNumber(n: number, t: number) {
  for (let candidate = n; candidate <= 100; candidate++) {
    const calculatedDigitProduct = String(candidate)
      .split("")
      .map((value) => Number(value))
      .reduce((product, digit) => product * digit, 1);

    if (calculatedDigitProduct % t === 0) {
      return candidate;
    }
  }
}

/**
 * 목적:
 * 각 자릿수의 곱이 t로 나누어 떨어진 가장 작은 수 반환
 *
 * 입력:
 * n: 정수 값
 * t: 나눌 값
 *
 * 처리:
 * 각 자릿수마다 곱하기
 * t로 나누어 떨어지는지 판별
 * 나누어떨어지지 않을 경우 n을 1씩 증가하고, 반복
 * 나누어떨어진다면 n을 반환
 *
 * 출력:
 * 각 자릿수의 곱이 t로 나누어 떨어진 가장 작은 값
 */
