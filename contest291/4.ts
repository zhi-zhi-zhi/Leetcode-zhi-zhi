function countHighestScoreNodes(parents: number[]): number {
  // 建图
  const graph = new Map<number, number[]>()
  const n = parents.length
  parents.forEach((parent, child) => {
    if (parent === -1)
      return
    const arr = graph.get(parent) ?? []
    arr.push(child)
    graph.set(parent, arr)
  })

  let max = 0
  let count = 0
  dfs(0)

  return count

  function dfs(node: number): number {
    if (node === -1)
      return 0

    const [left = -1, right = -1] = graph.get(node) ?? []
    const leftCount = dfs(left)
    const rightCount = dfs(right)

    let cur = (leftCount || 1) * (rightCount || 1) * ((n - 1 - leftCount - rightCount) || 1)

    if (max === cur)
      count++
    else if (max < cur) {
      count = 1
      max = cur
    }

    return leftCount + rightCount + 1
  }
};
