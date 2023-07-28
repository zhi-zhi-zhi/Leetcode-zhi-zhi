function arrayChange(nums: number[], operations: number[][]): number[] {
  const n = nums.length

  const map = new Map<number, number>()

  const m = operations.length
  for (let i = m - 1; i >= 0; i--) {
    const [from, to] = operations[i]
    map.set(from, map.get(to) ?? to)
  }

  for (let i = 0; i < n; i++)
    if (map.has(nums[i]))
      nums[i] = map.get(nums[i])

  return nums
}