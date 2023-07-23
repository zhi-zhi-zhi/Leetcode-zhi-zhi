function maxStarSum(vals: number[], edges: number[][], k: number): number {
  let res = vals[0]
  const n = vals.length

  /**
   * 存放邻居的值
   * @type {boolean}
   */

  const neighborMap = Array.from(Array(n), () => [])

  edges.forEach(([a, b]) => {
    neighborMap[a].push(vals[b])
    neighborMap[b].push(vals[a])
  })

  for (let i = 0; i < n; i++) {
    neighborMap[i].sort((a, b) => b - a)
    res = Math.max(res, vals[i] + neighborMap[i].slice(0, k).reduce((sum, num) => sum + (num >= 0 ? num : 0), 0))
  }

  return res
};
