function onesMinusZeros(grid: number[][]): number[][] {
  const m = grid.length, n = grid[0].length
  const res = Array.from(Array(m), () => Array(n).fill(0))

  const row1 = Array(m).fill(0)
  const row0 = Array(m).fill(0)
  const col1 = Array(n).fill(0)
  const col0 = Array(n).fill(0)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        row1[i]++
        col1[j]++
      } else {
        row0[i]++
        col0[j]++
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[i][j] = row1[i] + col1[j] - row0[i] - col0[j]
    }
  }

  return res
};