function minMaxGame(nums: number[]): number {
  let n = nums.length

  while (n > 0)  {
    n = (n >> 1)
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        nums[i] = Math.min(nums[2 * i], nums[2 * i + 1])
      } else {
        nums[i] = Math.max(nums[2 * i], nums[2 * i + 1])
      }
    }
  }

  return nums[0]
}