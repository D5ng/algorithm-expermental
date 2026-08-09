/** biome-ignore-all lint/suspicious/noExplicitAny: 어떤 데이터 타입의 배열로 들어올지 예측할 수 없습니다. */

/**
 * 중첩된 배열을 지정한 깊이(depth)만큼 평탄화하는 flatten 함수를 구현하세요.
 *
 * flatten 함수는 다음 조건을 만족해야 합니다.
 *
 * `flatten(arr: any[], depth?: number): any[]` 형태로 동작해야 합니다.
 * depth를 생략하면 기본값 1만큼만 평탄화해야 합니다.
 * depth로 Infinity를 전달하면 중첩 깊이와 상관없이 모두 평탄화해야 합니다.
 * Array.prototype.flat()을 사용해서는 안 됩니다.
 * 평탄화 과정에서 배열 내부의 객체·배열 등 참조 타입 요소는 원본과 동일한 참조를 유지해야 합니다.
 *
 * 예시
 * ```ts
 * const nested = [1, [2, [3, [4]]], 5]
 * flatten(nested)            // [1, 2, [3, [4]], 5]
 * flatten(nested, 2)         // [1, 2, 3, [4], 5]
 * flatten(nested, Infinity)  // [1, 2, 3, 4, 5]
 * ```
 * @param arr
 * @param depth
 */
export function flatten(arr: any[], depth = 1) {
  const flattened = [];

  for (const element of arr) {
    if (canFlatten(element, depth)) {
      flattened.push(...flatten(element, depth - 1));
    } else {
      flattened.push(element);
    }
  }

  return flattened;
}

/**
 * 평탄화 가능 여부를 판별하는 함수
 * @param value 평탄화할 값
 * @param depth 평탄화할 깊이
 * @returns boolean
 */
function canFlatten(value: any, depth: number) {
  return Array.isArray(value) && depth > 0;
}

/**
 * 입력:
 * arr: 배열
 * depth: 평탄화할 뎁스
 *
 * 처리:
 * - 평탄화할 배열 추가
 * - 배열을 순회
 * - 만약 원소의 값이 배열이고, depth가 0보다 크다면?
 * - 원소의 값이 배열이 아니라면 평탄화할 배열에 원소 추가
 * - 위 과정을 depth가 0이거나, 배열이 없을 아닐 때 까지 처리 (재귀 사용)
 *
 * 출력:
 * - 평탄화된 배열
 */
