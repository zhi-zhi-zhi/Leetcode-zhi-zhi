function findMissingAndRepeatedValues(grid: number[][]): number[] {
  const res = []
  const n = grid.length
  const arr = Array(n*n + 1).fill(true)

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[grid[i][j]]) {
        arr[grid[i][j]] = false
      } else {
        res.push(grid[i][j])
      }
    }
  }

  for (let i = 0; i <= n * n; i++)
    if (arr[i])
      res.push(i)

  return res
};