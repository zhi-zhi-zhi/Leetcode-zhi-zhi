function rangeAddQueries(n: number, queries: number[][]): number[][] {
  const mat = Array.from(Array(n), () => Array(n).fill(0))

  for (const [r1, c1, r2, c2] of queries) {
    for (let i = r1; i <= r2; i++) {
      for (let j = c1; j <= c2; j++) {
        mat[i][j]++
      }
    }
  }

  return mat
};
