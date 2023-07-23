function reachableNodes(n: number, edges: number[][], restricted: number[]): number {
  const graph = new Map()
  const visited = Array(n).fill(false)

  edges.forEach(([one, two]) => {
    const arr = graph.get(one) ?? []
    arr.push(two)
    graph.set(one, arr)

    const arr2 = graph.get(two) ?? []
    arr2.push(one)
    graph.set(two, arr2)
  })
  restricted.forEach((itemRestricted) => {
    visited[itemRestricted] = true
  })

  const queue = [0]
  let res = 0

  while (queue.length > 0) {
    const node = queue.shift()!

    if (visited[node])
      continue
    visited[node] = true
    res++

    for (const neighbors of (graph.get(node) ?? []))
      if (!visited[neighbors])
        queue.push(neighbors)
  }

  return res
}


reachableNodes(7
  ,[[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]]
  ,[4,5])
