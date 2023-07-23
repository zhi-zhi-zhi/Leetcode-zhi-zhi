function closestMeetingNode(edges: number[], node1: number, node2: number): number {
  const n = edges.length;
  const map = Array(n).fill(-1)
  edges.forEach((to, from) => {
    map[from] = to
  })

  const arr1 = bfs(node1)
  const arr2 = bfs(node2)
  let ans = -1
  let x = 1e10
  for (let i = 0; i < n; i++) {
    if (arr1[i] !== -1 && arr2[i] !== -1) {
      const temp = Math.max(arr1[i], arr2[i])
      if (temp < x) {
        x = temp
        ans = i
      }
    }
  }

  return ans


  function bfs(start: number): number[] {
    const res = Array(n).fill(-1)
    res[start] = 0

    const visited = Array(n).fill(false)
    const queue = [[start, 0]]

    while (queue.length > 0) {
      const [cur, weight] = queue.shift()!;
      if (visited[cur])
        continue
      visited[cur] = true
      res[cur] = weight

      if (map[cur] !== -1) {
        queue.push([map[cur], weight + 1])
      }
    }

    return res
  }
}

// console.log(closestMeetingNode([2,2,3,-1], 0, 1));
