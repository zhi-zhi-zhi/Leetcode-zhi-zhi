function differenceOfDistinctValues(grid: number[][]): number[][] {
  const set = new Set<number>()

  const m = grid.length, n = grid[0].length
  const leftTop = Array.from(Array(m), () => Array(n).fill(0))

  for (let j = 0; j < n; j++) {
    set.clear()
    set.add(grid[0][j])
    help(1, j + 1)
  }

  for (let i = 1; i < m; i++) {
    set.clear()
    set.add(grid[i][0])
    help(i + 1, 1)
  }

  function help(i: number, j: number) {
    if (i >= m || j >= n) return

    leftTop[i][j] = set.size
    set.add(grid[i][j])

    help(i + 1, j + 1)
  }


  const rightBottom = Array.from(Array(m), () => Array(n).fill(0))

  for (let j = n - 1; j >= 0; j--) {
    set.clear()
    set.add(grid[m - 1][j])
    help2(m - 2, j - 1)
  }

  for (let i = m - 2; i >= 0; i--) {
    set.clear()
    set.add(grid[i][n - 1])
    help2(i - 1, n - 2)
  }

  function help2(i: number, j: number) {
    if (i < 0 || j < 0) return

    rightBottom[i][j] = set.size
    set.add(grid[i][j])

    help2(i - 1, j - 1)
  }

  const res = Array.from(Array(m), () => Array(n).fill(0))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[i][j] = Math.abs(leftTop[i][j] - rightBottom[i][j])
    }
  }

  return res
}

// console.log(differenceOfDistinctValues([[1,2,3],[3,1,5],[3,2,1]]))