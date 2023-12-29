function getGoodIndices(variables: number[][], target: number): number[] {
  let res = []
  const q = BigInt(target)
  const tenBig = BigInt(10)
  const arr = variables.map(arr => arr.map(num => BigInt(num)))

  for (let i = 0; i < variables.length; i++) {
    const [a, b, c, m] = arr[i]

    if ((((a ** b) % tenBig) ** c) % m == q)
      res.push(i)
  }

  return res
};