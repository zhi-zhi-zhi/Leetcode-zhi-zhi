interface TreeNode {
  val: number
  maxPathSum: number
  left: TreeNode | null
  right: TreeNode | null
}
/**
 * 1. 找出最长子路径的和 max
 * 2. 找出所有子路径的和
 *
 * 3. 记录每个根节点的最长子路径和
 * 4. 遍历子节点， res += leftMax - 当前最长子路径和
 *
 * @param {number} n
 * @param {number[]} cost
 * @returns {number}
 */
function minIncrements(n: number, cost: number[]): number {
  const root = dfs(0)
  const max = root.maxPathSum
  let res = 0

  dfs2(root, max)

  return res

  function dfs2(node: TreeNode | null, leftMax: number) {
    if (node === null) return

    // 贪心：父节点 + val = 该父节点的所有子路径 sum + val
    const addVal = leftMax - node.maxPathSum
    res += (addVal)
    // unuseful: node.val += addVal

    dfs2(node.left, leftMax - (addVal + node.val))
    dfs2(node.right, leftMax - (addVal + node.val))
  }

  function dfs(index: number): TreeNode | null {
    if (index >= n) return null

    const leftNode = dfs(index * 2 + 1)
    const rightNode = dfs(index * 2 + 2)

    return {
      val: cost[index],
      maxPathSum: cost[index] +
        Math.max(leftNode?.maxPathSum ?? 0, rightNode?.maxPathSum ?? 0),
      left: leftNode,
      right: rightNode
    }
  }
};
