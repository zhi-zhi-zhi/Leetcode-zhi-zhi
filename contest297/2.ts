function minPathCost(grid: number[][], moveCost: number[][]): number {
  // 找到到达当前行没一列的最优代价，动态规划
  const m = grid.length
  const n = grid[0].length
  const dp = Array.from(Array(m), () => Array(n).fill(Number.MAX_SAFE_INTEGER))
  let res = Number.MAX_SAFE_INTEGER

  // 第一行的代价
  for (let j = 0; j < n; j++)
    dp[0][j] = grid[0][j]

  for (let i = 0; i < m - 1; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++)
        dp[i+1][k] = Math.min(dp[i+1][k], dp[i][j] + moveCost[grid[i][j]][k] + grid[i+1][k])

  for (let j = 0; j < n; j++)
    res = Math.min(res, dp[m-1][j])

  return res
}

// console.log(minPathCost([[5,3],[4,0],[2,1]], [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]]))
// console.log(minPathCost([[5,1,2],[4,0,3]], [[12,10,15],[20,23,8],[21,7,1],[8,1,13],[9,10,25],[5,3,2]]))