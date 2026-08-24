type StackItem = { sourceObject: any; cloned: any }

export function cloneDeepStack<T>(sourceObject: T): T {
	if (isPrimitive(sourceObject)) {
		return sourceObject
	}

	const cloned = Array.isArray(sourceObject) ? [] : {}
	const stack: StackItem[] = [{ sourceObject, cloned }]

	while (stack.length > 0) {
		const item = stack.pop()
		if (item === undefined) {
			continue
		}

		const { sourceObject, cloned } = item

		for (const [key, value] of Object.entries(sourceObject)) {
			if (isPrimitive(value)) {
				cloned[key] = value
				continue
			}

			const children = Array.isArray(value) ? [] : {}
			cloned[key] = children

			stack.push({ sourceObject: value, cloned: children })
		}
	}

	return cloned as T
}

function isPrimitive(value: unknown): value is string | number | boolean | null | undefined | symbol | bigint {
	return (
		value === null ||
		value === undefined ||
		typeof value === "string" ||
		typeof value === "number" ||
		typeof value === "bigint" ||
		typeof value === "symbol" ||
		typeof value === "boolean"
	)
}
