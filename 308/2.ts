function numberOfWays(startPos: number, endPos: number, k: number): number {
  const from = Math.min(startPos, endPos)
  const to = Math.max(startPos, endPos)
  const need = to - from
  if (k < need || (k - need) % 2 === 1)
    return 0
  if (k === need)
    return 1

  let res = BigInt(0)
  const MODULE = BigInt(1e9 + 7)

  // @ts-ignore
  res = (res + (BigInt(2) ** BigInt((k - need) / 2)) * (BigInt(need) + BigInt(1))) % MODULE

  return Number(res)
}
