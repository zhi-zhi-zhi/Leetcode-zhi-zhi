function findMaxK(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const set = new Set(nums)


  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] > 0 && set.has(-nums[i]))
      return nums[i]
  }

  return -1
}
