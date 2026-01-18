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

// NOTE: 문제 정의 내리기.
// 주어진 n에 대하여 가장 큰 팩토리얼 값을 구하기.
// 즉 팩토리얼 값과 딱 맞아 떨어지는게 아니라, 주어진 입력값에서 가장 큰 팩토리얼 값을 구하는 문제.
// n이 factorial보다 같거나 클때까지 반복하면 if문 깔끔하게 제거
// 지금은 1부터 시작이지만, n의 값을 "어떤 처리를 통하여" 상향식과 하향식을 정할 순 없을까?
// 팩토리얼에 대한 이해가 필요해보인다.
// 숫자가 많이 커진다면 어떻게 해야할까?

function solution(n: number) {
	let result = 1;
	let fact = 1;

	while ((fact + 1) * result <= n) {
		fact += 1;
		result *= fact;
	}

	return fact;
}

console.log(solution(3628800));
console.log(solution(1));
