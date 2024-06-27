function maxScore(grid: number[][]): number {
  const m = grid.length, n = grid[0].length
  let res = grid[0][1] - grid[0][0]

  // 记录最小值
  let dp = JSON.parse(JSON.stringify(grid))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] = Math.min(grid[i][j], i > 0 ? dp[i - 1][j] : grid[i][j], j > 0 ? dp[i][j - 1] : grid[i][j])

      if (i > 0 || j > 0) {
        res = Math.max(res, grid[i][j] - (Math.min(
          i > 0 ? dp[i - 1][j] : 1e10, j > 0 ? dp[i][j - 1] :  1e10)))
      }
    }
  }

  return res
};

// console.log(maxScore([[4, 3, 2], [3, 2, 1]]))