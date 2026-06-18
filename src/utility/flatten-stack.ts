export function flattenStack<T>(sourceArray: T[], depth: number = 1) {
  const flatten = [];
  const stack = [...sourceArray];

  while (stack.length > 0) {
    const value = stack.shift();

    if (Array.isArray(value) && depth > 0) {
      stack.unshift(...value);
      depth -= 1;
    } else {
      flatten.push(value);
    }
  }

  return flatten;
}
