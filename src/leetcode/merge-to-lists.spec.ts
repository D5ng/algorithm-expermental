import { describe, expect, it } from "vitest"

import { ListNode, mergeTwoLists } from "./merge-to-lists"

function createList(values: number[]): ListNode | null {
	const nodes = values.map((value) => new ListNode(value))

	for (const [index, node] of nodes.entries()) {
		node.next = nodes[index + 1] ?? null
	}

	return nodes[0] ?? null
}

function toValues(head: ListNode | null): number[] {
	const values: number[] = []
	let current = head

	while (current !== null) {
		values.push(current.val)
		current = current.next
	}

	return values
}

describe("mergeTwoLists", () => {
	it("정렬된 두 연결 리스트를 하나의 정렬된 리스트로 병합한다", () => {
		const mergedList = mergeTwoLists(createList([1, 2, 4]), createList([1, 3, 4]))

		expect(toValues(mergedList)).toEqual([1, 1, 2, 3, 4, 4])
	})

	it("한쪽 연결 리스트의 노드가 더 많아도 정렬된 리스트로 병합한다", () => {
		const mergedList = mergeTwoLists(createList([1, 3]), createList([2, 4, 5, 6]))

		expect(toValues(mergedList)).toEqual([1, 2, 3, 4, 5, 6])
	})

	it("음수가 포함되어 있어도 오름차순으로 병합한다", () => {
		const mergedList = mergeTwoLists(createList([-10, -3, 2]), createList([-7, -1, 4]))

		expect(toValues(mergedList)).toEqual([-10, -7, -3, -1, 2, 4])
	})

	it("두 리스트가 모두 비어 있으면 빈 리스트를 반환한다", () => {
		const mergedList = mergeTwoLists(null, null)

		expect(toValues(mergedList)).toEqual([])
	})

	it("한 리스트만 비어 있으면 다른 리스트를 반환한다", () => {
		const mergedList = mergeTwoLists(null, createList([0]))

		expect(toValues(mergedList)).toEqual([0])
	})
})
