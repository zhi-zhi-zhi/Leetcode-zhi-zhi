function countCompleteComponents(n: number, edges: number[][]): number {
  const graph = Array.from(Array(n), () => [])

  for (const [i, j] of edges) {
    graph[i].push(j)
    graph[j].push(i)
  }

  let count = 0
  let set = new Set<number>()

  for (let i = 0; i < n; i++) {
    if (set.has(i)) continue

    // 1. dfs 找出所有节点
    const curSet = new Set<number>()
    dfs(i, curSet)
    const allNodes = curSet.size

    // 2. 所有节点的边数量 = all - 1
    if (Array.from(curSet).every(node => graph[node].length === allNodes - 1))
      count++

    curSet.forEach(key => {
      set.add(key)
    })
  }


  return count

  function dfs(node: number, set: Set<number>) {
    set.add(node)

    for (const neighbor of graph[node])
      if (set.has(neighbor)) continue
      else dfs(neighbor, set)
  }
};
