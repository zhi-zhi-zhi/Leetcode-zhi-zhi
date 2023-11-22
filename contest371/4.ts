function maximumStrongPairXor(nums: number[]): number {
  nums.sort((a, b) => a - b)
  let res = -1

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j])) {
        res = Math.max(res, nums[i] ^ nums[j])
      }
    }
  }

  return res
}