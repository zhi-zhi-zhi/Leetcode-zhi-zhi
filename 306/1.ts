function largestLocal(grid: number[][]): number[][] {
  const n = grid.length
  const res = Array.from(Array(n-2), () => Array(n-2).fill(0))

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      let curMax = grid[i][j]
      // 找最小值
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          curMax = Math.max(curMax, grid[x][y])
        }
      }

      res[i-1][j-1] = curMax
    }
  }

  return res
}
