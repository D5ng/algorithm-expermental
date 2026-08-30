/**
 * 정수 배열이 주어집니다. 배열의 모든 정수는 두 번씩 등장하지만,
 * 단 하나의 정수만 한 번 등장합니다.
 *
 * 한 번만 등장하는 정수를 빠르게 찾아 반환하세요.
 *
 * @example
 * ```ts
 * const arr = [10, 2, 2, 1, 0, 0, 10]
 *
 * findSingle(arr) // 1
 * ```
 *
 * 작성한 접근 방식의 시간 복잡도와 공간 복잡도도 고려해 보세요.
 * 더 효율적으로 개선할 수 있는지도 생각해 보세요.
 */

export function findSingle(arr: number[]): number {
	const countLookup = {}

	// 시간 복잡도 O(n)
	// 공간 복잡도 O(k)
	for (let index = 0; index < arr.length; index += 1) {
		const value = arr[index]

		if (countLookup[value]) {
			countLookup[value] += 1
		} else {
			countLookup[value] = 1
		}
	}

	// Object.entries(countLookup) => k개수
	// filter => k개수
	return Number(Object.entries(countLookup).filter(([_value, count]) => count === 1)[0][0])
}

/**
 * 목적:
 * - 주어진 배열에서 한 번만 등장하는 정수를 반환한다.
 *
 * 입력:
 * - 숫자 배열
 * - 하나만 한 번 등장하고 나머지는 두 번 등장한다
 *
 * 출력:
 * - 한번만 등장한 숫자 반환
 *
 * 흐름:
 * - [10, 2, 2, 1, 0, 0, 10] 기준
 * - index: 0, value: 10, count = 1
 * - index: 1, value: 2, count = 1
 * - index: 2, value: 2, count = 2
 * - index: 3, value: 1, count = 1
 * - index: 4, value: 0, count = 1
 * - index: 5, value: 0, count = 2
 * - index: 6, value: 10, count = 2
 *
 * 처리:
 * - 조회용 테이블을 준비한다
 * - 주어진 배열을 반복하며, 같은 값이 몇번 반복하는지 누적한다.
 * - 1번만 반복된 것을 출력한다
 *
 * 엣지 케이스:
 * - 배열에 숫자가 하나만 있는 경우
 * - 배열에 음수가 섞인 경우
 *
 * 복잡도 예상:
 * n => 입력 배열의 길이
 * k => 서로 다른 정수의 길이
 * - 시간 O(n + k + k) => O(n)
 * - 공간 O(k + k) => O(k)
 */
