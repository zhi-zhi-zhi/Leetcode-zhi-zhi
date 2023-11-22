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

function doubleIt(head: ListNode | null): ListNode | null {
  // 反转链表
  let pre = null, cur = head

  while (cur !== null) {
    const temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }

  head = pre

  pre = null
  cur = head
  let preAdd = 0
  while (cur !== null) {
    if (cur.val * 2 + preAdd > 9) {
      cur.val = (cur.val * 2 + preAdd) % 10
      preAdd = 1
    } else {
      cur.val = cur.val * 2 + preAdd
      preAdd = 0
    }

    pre = cur
    cur = cur.next
  }

  if (preAdd === 1) {
    pre.next = new ListNode(1, null)
  }

  // 反转
  pre = null, cur = head

  while (cur !== null) {
    const temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  head = pre

  return head
};