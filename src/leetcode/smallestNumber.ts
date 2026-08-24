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
		const digitProduct = calculateDigitProduct(candidate)

		if (isValidCandidate(digitProduct, t)) {
			return candidate
		}
	}
}

/* 각 자릿수를 곱하는 함수 */
function calculateDigitProduct(candidate: number) {
	return String(candidate)
		.split("")
		.map((value) => Number(value))
		.reduce((product, digit) => product * digit, 1)
}

/* 조건을 만족하는지 판별하는 함수 */
function isValidCandidate(digitProduct: number, t: number) {
	return digitProduct % t === 0
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
 * 입력받은 n을 기준으로 오름차순
 * 각 자릿수를 곱한다
 * 자릿수의 곱이 t로 나누어 떨어지는지 판별한다
 *
 *
 *
 * 출력:
 * 각 자릿수의 곱이 t로 나누어 떨어진 가장 작은 값
 */
