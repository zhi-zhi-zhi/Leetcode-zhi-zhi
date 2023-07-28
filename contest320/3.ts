function minimumFuelCost(roads: number[][], seats: number): number {
  const n = roads.length + 1
  if (roads.length === 1)
    return 0

  const graph = new Map()
  roads.forEach(([a, b]) => {
    if (graph.has(a)) {
      graph.get(a)!.push(b)
    } else {
      graph.set(a, [b])
    }

    [a, b] = [b, a]
    if (graph.has(a)) {
      graph.get(a)!.push(b)
    } else {
      graph.set(a, [b])
    }
  })

  // 搞一个有向图出来
  // [from, to]
  const newRoads: [number, number][] = []
  const queue: number[] = [0]
  const set = new Set()
  while (queue.length > 0) {
    const next: number[] = []

    for (const node of queue) {
      if (set.has(node))
        continue
      set.add(node)

      for (const neighbor of (graph.get(node) ?? [])) {
        if (set.has(neighbor))
          continue
        newRoads.push([neighbor, node])
        next.push(neighbor)
      }
    }

    queue.splice(0, queue.length, ...next)
  }

  // 构造有向图
  const directGraph = new Map<number, number[]>()
  // 每个城市的入度
  const inDegree = Array(n).fill(0)
  // 每个城市有多少人
  const hasSeated = Array(n).fill(1)
  for (const [from, to] of newRoads) {
    inDegree[to]++

    if (directGraph.has(from)) {
      directGraph.get(from)!.push(to)
    } else {
      directGraph.set(from, [to])
    }
  }

  // 所需汽油
  let res = 0
  queue.splice(0, queue.length)
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0)
      queue.push(i)
  }
  while (queue.length > 0) {
    const city = queue.shift()!

    if (city === 0)
      break

    // 实际 to 只会有一个
    for (const to of (directGraph.get(city) ?? [])) {
      // 车肯定很多
      // 但是这题不清楚，a 能不能去 c 城坐 b 的车
      res += Math.ceil(hasSeated[city] / seats)
      hasSeated[to] += hasSeated[city]
      hasSeated[city] = 0

      if (--inDegree[to] === 0)
        queue.push(to)
      break
    }
  }

  return res
}

// console.log(minimumFuelCost([[3, 1], [3, 2], [1, 0], [0, 4], [0, 5], [4, 6]], 2))