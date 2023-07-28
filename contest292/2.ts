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
function averageOfSubtree(root: TreeNode | null): number {
  let num = 0
  dfs(root)
  return num

  function dfs(node: TreeNode | null): number[] {
    if (node === null) {
      return [0, 0]
    }
    const left = dfs(node.left)
    const right = dfs(node.right)
    const res = [left[0] + right[0] + 1, left[1] + right[1] + node.val]

    if (Math.trunc(res[1] / res[0]) === node.val)
      num++

    return [left[0] + right[0] + 1, left[1] + right[1] + node.val]
  }
};
