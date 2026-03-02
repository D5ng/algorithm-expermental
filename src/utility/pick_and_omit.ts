/**
 * ! pick & omit 함수 구현하기
 * 객체에서 필요한 속성만 골라내거나(pick), 특정 속성만 제외하는(omit) 함수야. 불변성을 유지하면서 데이터를 가공할 때 정말 많이 쓰여.
 *
 * 요구 사항:
 * pick<T, K>(obj: T, keys: K[]): Pick<T, K>
 * 대상 객체와 추출할 키 배열을 받아 새로운 객체를 반환해.
 * 존재하지 않는 키는 무시해야 해.
 *
 * omit<T, K>(obj: T, keys: K[]): Omit<T, K>
 * 대상 객체와 제외할 키 배열을 받아, 해당 키들이 제거된 새로운 객체를 반환해.
 *
 * 공통 사항:
 * 원본 객체(obj)를 직접 수정(Mutation)하면 절대 안 돼.
 * TypeScript를 사용해서 반환 타입이 정확하게 추론되도록 인터페이스를 설계해 줘.
 */

export function pick<T extends object, K extends keyof T>(sourceObject: T, keysToPick: K[]): Pick<T, K> {
	const resultObject = {} as Partial<T>;

	for (const key of keysToPick) {
		if (sourceObject[key]) {
			resultObject[key] = sourceObject[key];
		}
	}

	return resultObject as Pick<T, K>;
}

export function omit<T extends object, K extends keyof T>(sourceObject: T, keysToOmit: K[]): Omit<T, K> {
	const resultObject = {} as Partial<T>;
	const omitSet = new Set<PropertyKey>(keysToOmit);

	for (const key of Object.keys(sourceObject)) {
		if (!omitSet.has(key)) {
			resultObject[key] = sourceObject[key];
		}
	}

	return resultObject as Omit<T, K>;
}
