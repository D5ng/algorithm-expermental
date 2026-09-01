/**
 * 20. 올바른 괄호
 *
 * `(`, `)`, `{`, `}`, `[`, `]` 문자만으로 구성된 문자열 `s`가 주어집니다.
 * 입력 문자열이 유효한지 판별하세요.
 *
 * 문자열은 다음 조건을 모두 만족할 때 유효합니다.
 *
 * - 여는 괄호는 같은 종류의 닫는 괄호로 닫혀야 합니다.
 * - 여는 괄호는 올바른 순서로 닫혀야 합니다.
 * - 모든 닫는 괄호에는 같은 종류의 대응하는 여는 괄호가 있어야 합니다.
 *
 * 예시 1
 * 입력: s = "()"
 * 출력: true
 *
 * 예시 2
 * 입력: s = "()[]{}"
 * 출력: true
 *
 * 예시 3
 * 입력: s = "(]"
 * 출력: false
 *
 * 예시 4
 * 입력: s = "([])"
 * 출력: true
 *
 * 예시 5
 * 입력: s = "([)]"
 * 출력: false
 *
 * 제한 사항
 * - 1 <= s.length <= 10^4
 * - s는 `(`, `)`, `[`, `]`, `{`, `}` 문자로만 구성됩니다.
 */

const bracketMap = {
	")": "(",
	"]": "[",
	"}": "{",
}

export function isValid(brackets: string): boolean {
	const stack: string[] = []

	for (const bracket of brackets) {
		const openBracket = bracketMap[bracket]

		if (openBracket === undefined) {
			stack.push(bracket)
			continue
		}

		const latestBracket = stack.pop()

		if (latestBracket !== openBracket) {
			return false
		}
	}

	return stack.length === 0
}

/**
 * 목적:
 * - 각 여는 괄호가 같은 종류의 닫는 괄호이고, 올바른 순서로 닫히는지 판별하는 함수
 *
 * 입력:
 * - `brackets`
 * - `(`, `)`, `{`, `}`, `[`, `]` 문자만으로 구성된 문자열
 * - 1 <= s.length <= 10^4
 *
 * 출력:
 * 아래 조건을 모두 만족하면 true, 아니면 false를 반환한다
 * - 여는 괄호는 같은 종류의 닫는 괄호로 닫혀야 합니다.
 * - 여는 괄호는 올바른 순서로 닫혀야 합니다.
 * - 모든 닫는 괄호에는 같은 종류의 대응하는 여는 괄호가 있어야 합니다.
 *
 * 흐름:
 * 여는 괄호를 스택에 추가하고, 닫는 괄호를 만나면, 가장 최근에 추가된 스택에서 찾아 비교한다
 *
 * - "([])" 기준
 * - index: 0, bracket: "(", stack: ["("]
 * - index: 1, bracket: "[", stack: ["(", "["]
 * - index: 2, bracket: "]", stack: ["C"] => bracket이 닫힌 괄호라면, 스택에서 꺼내 비교"[" === "["
 * - index: 3, bracket: ")", stack: [""] => bracket이 닫힌 괄호라면, 스택에서 꺼내 비교"(" === "("
 *
 * - "()[]{}" 기준
 * - index: 0, bracket: "(", stack: ["("]
 * - index: 1, bracket: ")", stack: [""] => bracket이 닫힌 괄호라면, 스택에서 꺼내 비교"(" === "("
 * - index: 2, bracket: "[", stack: ["["]
 * - index: 3, bracket: "]", stack: [""] => bracket이 닫힌 괄호라면, 스택에서 꺼내 비교"[" === "["
 * - index: 4, bracket: "{", stack: ["}"]
 * - index: 5, bracket: "{", stack: [""] => bracket이 닫힌 괄호라면, 스택에서 꺼내 비교"{" === "{"
 *
 * - "([)]" 기준
 * - index: 0, bracket: "(", stack: ["("]
 * - index: 1, bracket: "[", stack: ["(", "["]
 * - index: 2, bracket: ")", stack: ["("] => bracket이 닫힌 괄호라면, 스택에서 꺼내 비교 "[" === "("
 * - 일치하지 않으면 false를 반환
 *
 * 처리:
 * - 닫는 괄호를 기준으로 쌍이 되는 여는 괄호를 준비한다
 * - 현재 순회중인 괄호가 여는 괄호라면 스택에 추가하고, 다음 괄호를 확인한다
 * - 닫는 괄호라면, 스택에 가장 최근에 추가된 괄호를 가져와 비교한다
 * - 만약 값이 일치하지 않다면 false를 반환한다
 * - 모든 괄호를 확인한 후, 여는 괄호가 남아있다면 false를 반환한다
 *
 * 엣지 케이스:
 * - 올바른 중첩된 괄호 => ([{}])
 * - 여러 종류의 괄호가 순서대로 닫힌 경우 => ()[]{}
 * - 중첩된 괄호가 잘못된 순서로 닫힌 경우 => ([)]
 * - 짝이 맞지 않는 괄호 => (]
 *
 * 복잡도 예상:
 * n: `brackets` 문자열의 길이
 * k: 닫는 태그에 대응하지 않는 괄호의 개수
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(n)
 */
