function numberOfPoints(nums: number[][]): number {
  const set = new Set()

  for (const [start, end] of nums)
    for (let i = start; i <= end; i++)
      set.add(i)

  return set.size
};