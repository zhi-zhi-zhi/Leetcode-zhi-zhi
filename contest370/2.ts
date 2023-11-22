function findChampion(n: number, edges: number[][]): number {
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