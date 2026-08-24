export function flattenStack<T>(sourceArray: T[], depth: number = 1): T[] {
	const flatten: T[] = []
	const stack = [...sourceArray]

	while (stack.length > 0) {
		const value = stack.shift()

		if (value === undefined) {
			continue
		}

		if (Array.isArray(value) && depth > 0) {
			stack.unshift(...value)
			depth -= 1
		} else {
			flatten.push(value)
		}
	}

	return flatten
}
