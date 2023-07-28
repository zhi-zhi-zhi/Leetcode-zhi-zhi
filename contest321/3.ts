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
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}

function removeNodes(head: ListNode | null): ListNode | null {
  if (head === null) return null

  const nums: number[] = []
  let p = head
  while (p !== null) {
    nums.push(p.val)
    // @ts-ignore
    p = p.next
  }


  const stack: number[] = []
  for (let i = 0; i < nums.length; i++) {
    // @ts-ignore
    while (stack.length > 0 && nums[i] > nums[stack.at(-1)]) {
      stack.pop()
    }

    stack.push(i)
  }

  // @ts-ignore
  const newHead = new ListNode(nums[stack[0]], null)
  let newP = newHead
  for (let i = 1; i < stack.length; i++) {
    newP.next = new ListNode(nums[stack[i]], null)
    newP = newP.next
  }

  return newHead
}

const node = new ListNode(5)
node.next = new ListNode(2)
node.next.next = new ListNode(12)
node.next.next.next = new ListNode(3)
node.next.next.next.next = new ListNode(8)
removeNodes(node)