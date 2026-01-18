/**
 * 가까운 수
 * 정수 배열 array와 정수 n이 매개변수로 주어질 때,
 * array에 들어있는 정수 중 n과 가장 가까운 수를 return 하도록 solution 함수를 완성해주세요.
 *
 * 제한사항
 * 1 ≤ array의 길이 ≤ 100
 * 1 ≤ array의 원소 ≤ 100
 * 1 ≤ n ≤ 100
 * 가장 가까운 수가 여러 개일 경우 더 작은 수를 return 합니다.
 *
 * 입출력 예
 * array	n	result
 * [3, 10, 28]	20	28
 * [10, 11, 12]	13	12
 */

export function 가까운_수(array: number[], n: number) {
	return array.reduce((acc, cur, index) => {
		const 현재차이 = Math.abs(cur - n);
		const 기존차이 = Math.abs(acc - n);

		if (기존차이 === 현재차이 && acc > cur) {
			return cur;
		}

		if (기존차이 > 현재차이) {
			return array[index];
		}

		return acc;
	});
}

console.log(가까운_수([28, 10, 3], 20)); // 28
console.log(가까운_수([3, 10, 28], 20)); // 28
console.log(가까운_수([10, 11, 12], 13)); // 12
console.log(가까운_수([4, 6], 5)); // 4
console.log(가까운_수([6, 4], 5)); // 4

// Note for문을 활용하여 구현하기
// export function 가까운_수(array: number[], n: number) {
// 	let result = array[0];

// 	for (let i = 0; i < array.length; i++) {
// 		const 현재차이 = Math.abs(array[i] - n);
// 		const 기존차이 = Math.abs(result - n);

// 		if (기존차이 === 현재차이 && result > array[i]) {
// 			result = array[i];
// 		}

// 		if (기존차이 > 현재차이) {
// 			result = array[i];
// 		}
// 	}

// 	return result;
// }

// NOTE 첫번째 문제.
// export function 가까운_수(array: number[], n: number) {
// 	const min = Math.min(...array.map((number) => Math.abs(number - n)));
// 	const closest = array.filter((number) => Math.abs(number - n) === min);
// 	return Math.min(...closest);
// }

// console.log(가까운_수([3, 10, 28], 20));
// console.log(가까운_수([10, 11, 12], 13));
// console.log(가까운_수([4, 6], 5));
