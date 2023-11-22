function minimumPossibleSum(n: number, target: number): number {
  const set = new Set<number>()

  let count = 1
  let len = 0

  while (len < n) {
    if (!set.has(target - count)) {
      len++
      set.add(count)
    }
    count++
  }

  return Array.from(set).reduce((sum, num) => sum + num, 0)
};