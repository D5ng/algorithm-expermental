/**
 * LeetCode 1. 두 수의 합 (Two Sum)
 *
 * 정수 배열 `nums`와 정수 `target`이 주어졌을 때, 다음 조건을 만족하는
 * 두 원소의 인덱스를 반환한다.
 *
 * - 두 원소의 합이 `target`과 같다.
 * - 같은 위치의 원소를 두 번 사용할 수 없다.
 * - 정답의 순서는 상관없다.
 * - 모든 입력에는 정확히 하나의 정답만 존재한다.
 *
 * @example
 * ```ts
 * twoSum([2, 7, 11, 15], 9); // [0, 1]
 * ```
 * `nums[0] + nums[1] = 2 + 7 = 9`이므로 값이 아닌 두 원소의 인덱스를 반환한다.
 *
 * @example
 * ```ts
 * twoSum([3, 2, 4], 6); // [1, 2]
 * ```
 * `nums[1] + nums[2] = 2 + 4 = 6`이므로 `[1, 2]`를 반환한다.
 *
 * @example
 * ```ts
 * twoSum([3, 3], 6); // [0, 1]
 * ```
 * 두 원소의 값은 같지만 서로 다른 위치에 있으므로 함께 사용할 수 있다.
 *
 * 제약 조건:
 * - `2 <= nums.length <= 10^4`
 * - `-10^9 <= nums[i] <= 10^9`
 * - `-10^9 <= target <= 10^9`
 * - 유효한 정답은 정확히 하나만 존재한다.
 *
 * 힌트:
 * 모든 두 원소의 조합을 확인하면 시간 복잡도는 `O(n^2)`이다.
 * 현재 값이 `x`라면 필요한 값은 `target - x`이므로,
 * 해시 맵을 사용해 필요한 값의 인덱스를 빠르게 찾을 수 있다.
 */

export function twoSum(nums: number[], target: number): number[] {
  const map = new Map(nums.map((value, index) => [value, index]));

  for (const [index, value] of nums.entries()) {
    const diffValue = target - value;

    const matchedIndex = map.get(diffValue);

    if (matchedIndex !== undefined && index !== matchedIndex) {
      return [index, matchedIndex];
    }
  }
}

/**
 * 목적:
 * 주어진 배열의 원소들을 더해서 `target` 목표 값에 맞는 인덱스를 반환
 *
 * 입력:
 * `nums` 숫자 배열
 * `target` 목표 값
 *
 * 처리:
 * 1. 배열 순회
 *  원소와 target의 차이를 구한다
 *  차이 값이 배열에 있는지 판별
 *  있다면 순회중인 index와 차이 값이 존재하는 배열의 index를 반환
 *
 * 2. 성능 최적화 (hash map)
 * 최적화 전에는 배열의 개수가 늘어날수록 시간복잡도가 O(n2)이기 때문에, 객체 또는 Map을 사용하여 O(1) 형태로 개선 할 수 있음
 * key의 값을 value로 두어 조회 시 O(1)로 가능하도록 구현
 *
 * 출력:
 * 목표 값에 해당하는 인덱스 배열
 */
