/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head

    const dummy = new ListNode(1e10)
    dummy.next = head
    let p: ListNode | null = dummy

    while (p !== null) {
        while (p.next !== null) {
            const tempNext: ListNode = p.next

            let q: ListNode | null = tempNext.next
            while (q !== null && q.val === tempNext.val)
                q = q.next

            if (tempNext.next !== q)
                p.next = q
            else
                break
        }

        p = p.next
    }

    return dummy.next
}

let head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(4)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)
deleteDuplicates(head)