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
 *
 */

function createCountdownArray(n: number) {
	return Array.from({ length: n })
		.fill(n)
		.map((_, index) => n - index);
}

function multiply(...numbers: number[]) {
	return numbers.reduce((acc, value) => acc * value, 1);
}

function 구슬을_나누는_경우의_수(balls: number, share: number) {
	const molecule = createCountdownArray(balls);
	const denominator = [...createCountdownArray(balls - share), ...createCountdownArray(share)];

	for (const moleculeValue of molecule) {
		const reducedMoleculeIndex = molecule.indexOf(moleculeValue);
		const reducedDenominatorIndex = denominator.indexOf(moleculeValue);

		if (reducedDenominatorIndex !== -1) {
			denominator[reducedDenominatorIndex] = 1;
			molecule[reducedMoleculeIndex] = 1;
		}

		const resultOfMoleculeMultiplication = multiply(...molecule);
		const resultOfDenominatorMultiplication = multiply(...denominator);

		return Math.round(resultOfMoleculeMultiplication / resultOfDenominatorMultiplication);
	}
}

console.log(구슬을_나누는_경우의_수(3, 2));
console.log(구슬을_나누는_경우의_수(5, 3));
console.log(구슬을_나누는_경우의_수(1, 1));
console.log(구슬을_나누는_경우의_수(30, 15));
