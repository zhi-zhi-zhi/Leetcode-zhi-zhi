function applyOperations(nums: number[]): number[] {
  const n = nums.length

  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] = nums[i + 1] * 2
      nums[i + 1] = 0
    }
  }

  nums.sort((a, b) => {
    if (a === b)
      return 0
    if (a === 0)
      return 1
    if (b === 0)
      return -1
    return 0
  })
  return nums
}