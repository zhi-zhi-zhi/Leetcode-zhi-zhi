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
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}


function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
  const matrix = Array.from(Array(m), () => Array(n).fill(-1));
  let p = head

  let l = 0, r = n - 1;
  let t = 0, b = m - 1;
  while (l <= r && t <= b) {
    for (let col = l; col <= r; col++) {
      if (p === null)
        return matrix
      matrix[t][col] = p.val
      p = p.next
    }
    t++

    for (let row = t; row <= b; row++) {
      if (p === null)
        return matrix
      matrix[row][r] = p.val
      p = p.next
    }
    r--

    for (let col = r; col >= l; col--) {
      if (p === null)
        return matrix
      matrix[b][col] = p.val
      p = p.next
    }
    b--

    for (let row = b; row >= t; row--) {
      if (p === null)
        return matrix
      matrix[row][l] = p.val
      p = p.next
    }
    l++
  }

  return matrix;
};


const arr= [3,0,2,6,8,1,7,9,4,2,5,5,0]
const head = new ListNode(3)
let p = head
for (let i = 1; i < arr.length; i++) {
  p.next = new ListNode(arr[i])
  p = p.next
}
console.log(spiralMatrix(3, 5,head));
