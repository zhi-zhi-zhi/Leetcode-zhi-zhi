function equalPairs(grid: number[][]): number {
  let res = 0
  const m = grid.length
  const n = grid[0].length

  const rowMap = new Map<string, number>()
  const colMap = new Map<string, number>()
  for (let i = 0; i < m; i++) {
    const rowStr = grid[i].join('_')
    rowMap.set(rowStr, (rowMap.get(rowStr) ?? 0) + 1)
  }
  for (let j = 0; j < n; j++) {
    const colStr =  grid.map((row) => row[j]).join('_')
    colMap.set(colStr, (colMap.get(colStr) ?? 0) + 1)
  }

  for (const entry of Array.from(rowMap.entries())) {
    if (colMap.has(entry[0]))
      res += entry[1] * colMap.get(entry[0])!
  }

  return res
}
