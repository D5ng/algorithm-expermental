/**
 * ### 📋 요구 사항
 * 1. **`flatten(arr: any[], depth?: number): any[]`** 구현
 * 2. **기능 상세**
 *    - `depth` 기본값은 1.
 *    - `Infinity` 전달 시 모든 중첩을 평탄화.
 * 3. **제약 조건**
 *    - `Array.prototype.flat()` 사용 금지.
 *    - 배열 내부의 요소가 객체나 다른 참조 타입일 경우 참조가 깨지지 않게 주의.
 */
/** biome-ignore-all lint/suspicious/noExplicitAny: 어떤 데이터 타입의 배열로 들어올지 예측할 수 없습니다. */

function canFlatten(value: any[], depth: number) {
	return Array.isArray(value) && depth > 0;
}

export function flatten(arr: any[], depth: number = 1) {
	const flattened = [];

	for (const value of arr) {
		if (canFlatten(value, depth)) {
			flattened.push(...flatten(value, depth - 1));
		} else {
			flattened.push(value);
		}
	}

	return flattened;
}
