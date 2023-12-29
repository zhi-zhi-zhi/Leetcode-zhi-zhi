function numberGame(nums: number[]): number[] {
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i += 2) {
    const temp = nums[i]
    nums[i] = nums[i + 1]
    nums[i + 1] = temp
  }

  return nums
}