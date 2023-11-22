function minimumSum(n: number, k: number): number {
  const set = new Set<number>()
  let num = 1

  while (set.size < n) {
    if (!set.has(k - num)) {
      set.add(num)
    }
    num++
  }

  return Array.from(set).reduce((sum, num) => sum + num, 0)
}