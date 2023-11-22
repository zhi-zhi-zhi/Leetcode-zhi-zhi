function findChampion(grid: number[][]): number {
  const n = grid.length
  const edges: number[][] = []

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) edges.push([i, j])
    }
  }

  return findChampion2(n, edges)
};

function findChampion2(n: number, edges: number[][]): number {
  const flagArr = Array(n).fill(true)

  for (const [from, to] of edges) {
    flagArr[to] = false
  }

  let res = []
  for (let i = 0; i < n; i++) {
    if (flagArr[i]) {
      res.push(i)
    }
  }

  return res.length === 1 ? res[0] : -1
};