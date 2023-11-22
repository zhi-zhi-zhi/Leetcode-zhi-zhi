function countVisitedNodes(edges: number[]): number[] {
  const n = edges.length
  const res: number[] = Array(n).fill(-1)
  const preVisitedMap = new Map<number, number>()
  const pathArr: number[] = []

  for (let i = 0; i < n; i++) {
    if (res[i] === -1) {
      pathArr.splice(0, pathArr.length)
      preVisitedMap.clear()
      bfs(i)
    }
  }

  return res


  function bfs(node: number): number {
    if (res[node] !== -1) {
      return res[node]
    }
    if (preVisitedMap.has(node)) {
      const circleLen = pathArr.length - preVisitedMap.get(node)
      for (let i = preVisitedMap.get(node); i < pathArr.length; i++) {
        res[pathArr[i]] = circleLen
      }
      return circleLen
    }

    preVisitedMap.set(node, pathArr.length)
    pathArr.push(node)
    const canVisitedNodes = bfs(edges[node])

    if (res[node] === -1) {
      res[node] = canVisitedNodes + 1
    }

    return res[node]
  }
}

// console.log(countVisitedNodes([1, 0, 3, 2]))