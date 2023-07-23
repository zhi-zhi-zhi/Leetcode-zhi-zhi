interface Vertex {
  // 有多少个节点连接到自己
  fromNodes: number
  // 自己出去了多少个节点
  toNodes: number
}

/**
 * 其中每个节点 至多 有一条出边。
 *
 * 1. 剪枝
 *   入度为 0 的边，去掉
 *   出度为 0 的边，去掉
 * 2. 收集入度为 0 的边，其指向皆为无效，dfs 去除指向的入边
 * @param {number[]} edges
 * @returns {number}
 */
function longestCycle(edges: number[]): number {
  let res = -1
  const n = edges.length
  /**
   * 第一个 bit 表示有入度
   * 第二个 bit 表示有出度
   * @type {any[]}
   */
  const count: Vertex[] = Array.from(Array(n), () => ({fromNodes: 0, toNodes: 0}))
  edges.forEach((to, from) => {
    if (to !== -1) {
      // 0：出度
      count[from].toNodes++
      // 1：入度
      count[to].fromNodes++
    }
  })

  // 收集入度为 1 的边，dfs删，其实就是拓扑排序
  const help: number[] = []
  count.forEach((obj, index) => {
    if (obj.fromNodes === 0)
      help.push(index)
  })
  while (help.length > 0) {
    const zeroIndex = help.shift()!;
    const to = edges[zeroIndex]
    // 有出边
    if (to !== -1) {
      count[zeroIndex].toNodes--
      count[to].fromNodes--
      if (count[to].fromNodes === 0)
        help.push(to)
    }
  }

  const map = Array(n).fill(-1)
  edges.forEach((to, from) => {
    // to 和 from 都要满足有入边、有出边
    if (to !== -1 && count[to].fromNodes > 0 && count[to].toNodes > 0 && count[from].fromNodes > 0 && count[from].toNodes > 0)
      map[from] = to
  })

  const distance = Array(n).fill(-1)
  // 由于只有一条出边，所以每个环都是独立的，不会交织
  const visited = Array(n).fill(false)
  for (let i = 0; i < n; i++) {
    if (map[i] === -1)
      continue
    if (visited[i])
      continue

    distance.fill(-1)
    distance[i] = 0
    let circleLen = 0
    const queue = [[i, 0]]
    let isCircle = false
    while (queue.length > 0) {
      const [cur, weight] = queue.shift()!;

      visited[cur] = true
      if (map[cur] !== -1) {
        if (distance[map[cur]] !== -1) {
          isCircle = true
          circleLen = weight + 1 - distance[map[cur]]
          break
        }
        distance[map[cur]] = weight + 1
        queue.push([map[cur], weight + 1])
      }
    }

    if (isCircle)
      res = Math.max(res, circleLen)
  }

  return res
}
console.log(longestCycle([4,3,3,4,7,2,3,3]));
console.log(longestCycle([3,3,4,2,3]));
console.log(longestCycle([2,-1,3,1]));
