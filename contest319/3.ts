class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function minimumOperations(root: TreeNode | null): number {
  if (root === null)
    return 0

  let res = 0
  const queue: TreeNode[] = [root]

  while (queue.length > 0) {
    const next = []

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].left !== null)
        next.push(queue[i].left)
      if (queue[i].right !== null)
        next.push(queue[i].right)
    }

    // 采用鸽子回笼的方式
    const temp = queue
      .map((item, index) => [item.val, index])
      .sort((a, b) => a[0] - b[0])
      .map(x => x[1])
    for (let i = 0; i < temp.length;) {
      if (temp[i] === i) {
        i++
        continue
      }
      const x = temp[temp[i]]
      temp[temp[i]] = temp[i]
      temp[i] = x
      res++
    }

    queue.splice(0, queue.length, ...next)
  }

  return res
}