/**
 * 두 배열이 주어졌을 때, 두 배열에 모두 존재하는 요소(교집합)를 반환한다.
 *
 * - 배열은 정렬되어 있지 않으며, 중복 요소가 있을 수 있다.
 * - 배열을 직접 수정해도 된다.
 * - 반환되는 요소의 순서는 자유지만, 중복은 포함하면 안 된다.
 * - 구현한 접근 방식의 시간 복잡도와 공간 복잡도도 생각해 본다.
 */

/**
 * 두 배열에서 공통으로 존재하는 모든 요소를 반환
 * @param left 순서와 상관없는 배열
 * @param right 순서와 상관없는 배열
 * @returns 중복없는 공통 요소의 배열
 */
export function getIntersection(left: any[], right: any[]) {
	const { iterationTarget, lookupTarget } = resolveTargets(left, right)
	const lookup = buildLookup(lookupTarget)

	return [...new Set(iterationTarget.filter((value) => lookup[value]))]
}

/**
 * 순회할 대상과 조회할 대상을 결정
 * @param left 매개변수 순서와 상관없는 배열
 * @param right 매개변수 순서와 상관없는 배열
 * @returns { iterationTarget, lookupTarget }
 */
function resolveTargets(left: any[], right: any[]) {
	const iterationTarget = left.length > right.length ? right : left
	const lookupTarget = iterationTarget === right ? left : right
	return { iterationTarget, lookupTarget }
}

/**
 * 조회 가능한 데이터를 만듭니다
 * @param value 조회 가능한 형태로 바꿀 값들
 * @returns 조회 가능한 데이터
 */
function buildLookup<T extends PropertyKey>(values: T[]): Record<T, boolean> {
	return Object.fromEntries(values.filter(() => true).map((value) => [value, true])) as Record<T, boolean>
}

/**
 * 목적:
 * 두 배열에 모두 존재하는 요소를 반환한다.
 *
 * 입력:
 * - `left` any[]
 * - `right` any[]
 *
 * 출력:
 * - `left`, `right`에 공통으로 존재하는 배열을 반환
 *
 * 흐름:
 * left(순회 대상)["a", "b", "c"], right(조회용 테이블)["b", "a", "d", "c"]
 * left: a, right: a => [a]
 * left: b, right: b => [a, b]
 * left: c, right: c => [a, b, c]
 *
 * left(순회 대상)[1, 1, 2, 3, 3], right(조회용 테이블)[1, 1, 3, 3, 4]
 * left: 1, right: 1 => [1]
 * left: 1, right: 1 => Set에 같은 값이 있다면 추가 X
 * left: 2, right: 없음 => [1]
 * left: 3, right: 3 => [1, 3]
 * left: 3, right: 3 => Set에 같은 값이 있다면 추가 X
 *
 * 처리:
 * - 배열의 길이를 비교하여, 짧은 배열을 찾는다.
 * - 짧은 배열을 기준으로 루프를 돈다
 * - 긴 배열은 객체로 조회 테이블로 만든다
 * - 현재 순회중인 요소가 조회 테이블에서 찾을 수 있다면 해당 값을 변수에 담는다.
 *
 * 보존 데이터:
 * - 공통적인 요소를 담을 배열 공간이 필요
 *
 * 예외처리:
 * - 중복된 값은 포함하면 안된다.
 * - `left`과 `right`에 중복된 값이 없다면 빈 배열을 반환한다.
 * - 두 배열 중 하나라도 빈 배열이 있다면 빈 배열을 반환한다.
 *
 * 복잡도:
 *   - n: `lookupTarget` 길이
 *   - m: `iterationTarget` 길이
 * - 시간 복잡도 O(n + m)
 * - 공간 복잡도 O(n + m)
 */
