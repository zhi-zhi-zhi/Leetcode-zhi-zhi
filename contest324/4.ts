function cycleLengthQueries(n: number, queries: number[][]): number[] {
  queries = queries.map(([a,b]) => [a - 1, b - 1])
  const res = Array(queries.length).fill(0)

  for (let i = 0; i < queries.length; i++) {
    const [a, b] = queries[i]
    const set = new Set<number>(getPath(a))
    for (const num of getPath(b)) {
      if (set.has(num))
        set.delete(num)
      else
        set.add(num)
    }
    res[i] = set.size + 1
  }

  return res

  function getPath(key: number): number[] {
    let res = []
    while (key > 0) {
      res.push(key)
      key = Math.trunc((key - 1) / 2)
    }
    res.push(0)

    return res
  }
};