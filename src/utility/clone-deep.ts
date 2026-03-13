/**
 * ### 📋 요구 사항
 * 1. **`cloneDeep<T>(obj: T): T`** 구현
 * 2. **지원 타입**
 *  - 일반 객체, 배열, `Date`, `RegExp`.
 * 3. **제약 조건**
 *    - `JSON.parse(JSON.stringify())` 방식 사용 금지 (함수나 undefined 누락 문제 때문).
 *    - **순환 참조 대응**: 객체 내부에 자기 자신을 가리키는 프로퍼티가 있어도 무한 루프에 빠지지 않아야 함 (힌트: `WeakMap` 활용).
 */

export function cloneDeep<T>(sourceObject: T, hash = new WeakMap()): T {
	if (isPrimitive(sourceObject)) {
		return sourceObject;
	}

	if (hash.has(sourceObject as object)) {
		return hash.get(sourceObject as object)
	}

	if (isDate(sourceObject)) {
		return new Date(sourceObject) as T;
	}

	if (isRegExp(sourceObject)) {
		return new RegExp(sourceObject) as T;
	}

	const container = (Array.isArray(sourceObject) ? [] : {}) as T;
	hash.set(sourceObject as object, container);

	for (const [key, value] of Object.entries(sourceObject)) {
		container[key] = cloneDeep(value, hash);
	}

	return container;
}

function isPrimitive(data: unknown): data is string | number | boolean | null | undefined | symbol | bigint {
	return data === null || data === undefined || typeof data === "string" || typeof data === "number" || typeof data === "boolean" || typeof data === "symbol" || typeof data === "bigint";
}


function isDate(data: unknown): data is Date {
	return data instanceof Date;
}

function isRegExp(data: unknown): data is RegExp {
	return data instanceof RegExp;
}
