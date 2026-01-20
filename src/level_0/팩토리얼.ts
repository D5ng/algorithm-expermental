/**
 * 팩토리얼
 * i팩토리얼 (i!)은 1부터 i까지 정수의 곱을 의미합니다.
 * 예를들어 5! = 5 * 4 * 3 * 2 * 1 = 120 입니다.
 * 정수 n이 주어질 때 다음 조건을 만족하는 가장 큰 정수 i를 return 하도록 solution 함수를 완성해주세요.
 *
 * 제한사항
 * 0 < n ≤ 3,628,800
 *
 * 입출력 예
 * n	result
 * 3628800	10
 * 7	3
 */

// 문제 정의
// 주어진 입력값 n에서 팩토리얼 중 가장 큰 수를 리턴해야 한다.

function solution(n: number) {
	let fact = 1;
	let value = 1;

	while (value * (fact + 1) <= n) {
		fact += 1;
		value *= fact;
	}

	return fact;
}

console.log(solution(3628800)); // 10
console.log(solution(7)); // 3
