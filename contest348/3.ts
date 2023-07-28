function matrixSumQueries(n: number, queries: number[][]): number {
  let res = 0
  let cols = n, rows = n
  const removeRows = new Set<number>()
  const removeCols = new Set<number>()

  for (let i = queries.length - 1; i >= 0; i--) {
    const [type, index, val] = queries[i]

    if (type === 0) {
      if (removeRows.has(index)) continue

      res += cols * val

      rows--
      removeRows.add(index)
    } else if (type === 1) {
      if (removeCols.has(index)) continue

      res += rows * val

      cols--
      removeCols.add(index)
    }
  }

  return res
};

// console.log(matrixSumQueries(3, [[0,0,1],[1,2,2],[0,2,3],[1,0,4]]))