function minOperations(k: number): number {
  if (k === 1) return 0
  if (k === 2) return 1
  if (k === 3) return 2

  const x = Math.sqrt(k)
  const xCeil = Math.ceil(x)

  return Math.ceil(k / xCeil) + xCeil - 1
}
