function monkeyMove(n: number): number {
  return (powerMod(2, n, 1e9 + 7) - 2 + 1e9 + 7) % (1e9 + 7)
}

function powerMod(a: number, b: number, c: number): number {
  let res = BigInt(1)
  let aI = BigInt(a % c)
  let bI = BigInt(b)
  const cI = BigInt(c)

  while (bI > 0) {
    if (bI % BigInt(2) === 1n) {
      res = (res * aI) % cI
    }

    bI = bI / BigInt(2)
    aI = (aI * aI) % cI
  }

  return Number(res)
}