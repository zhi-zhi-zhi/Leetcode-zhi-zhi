function deleteGreatestValue(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length

  let res = 0
  for (let i = 0; i < m; i++) {
    grid[i].sort((a, b) => b - a )
  }

  for (let j = 0; j < n; j++) {
    let max = grid[0][j]

    for (let row = 0; row < m; row++) {
      max = Math.max(max, grid[row][j])
    }

    res += max
  }

  return res
};
