function arithmeticTriplets(nums: number[], diff: number): number {
  let res = 0
  const set = new Set(nums)

  for (const num of Array.from(set)) {
    if (set.has(num - diff) && set.has(num - diff - diff))
      res++
  }

  return res
}
