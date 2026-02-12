/**
 * 문제 설명
 * 머쓱이는 구슬을 친구들에게 나누어주려고 합니다. 구슬은 모두 다르게 생겼습니다.
 * 머쓱이가 갖고 있는 구슬의 개수 balls와 친구들에게 나누어 줄 구슬 개수 share이 매개변수로 주어질 때,
 * balls개의 구슬 중 share개의 구슬을 고르는 가능한 모든 경우의 수를 return 하는 solution 함수를 완성해주세요.
 *
 * 제한사항
 * 1 ≤ balls ≤ 30
 * 1 ≤ share ≤ 30
 * 구슬을 고르는 순서는 고려하지 않습니다.
 * share ≤ balls
 *
 * 입출력 예
 * balls	share	result
 *   3			2			3
 *   5			3			10
 */

function createCountdownArray(n: number) {
	return Array.from({ length: n })
		.fill(n)
		.map((_, index) => n - index);
}

function 구슬을_나누는_경우의_수(balls: number, share: number) {
	const 분자 = createCountdownArray(balls);
	const 분모 = [...createCountdownArray(balls - share), ...createCountdownArray(share)];

	for (let i = 0; i < 분모.length; i++) {
		const index = 분자.indexOf(분모[i]);

		if (index !== -1) {
			분자[index] = 1;
			분모[i] = 1;
		}
	}

	const 분자reduce = 분자.reduce((acc, cur) => acc * cur, 1);
	const 분모reduce = 분모.reduce((acc, cur) => acc * cur, 1);

	return Math.round(분자reduce / 분모reduce);
}

console.log(구슬을_나누는_경우의_수(3, 2));
console.log(구슬을_나누는_경우의_수(5, 3));
console.log(구슬을_나누는_경우의_수(1, 1));
