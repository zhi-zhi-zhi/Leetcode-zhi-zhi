function partitionArray(nums: number[], k: number): number {
  const n = nums.length
  let res = 0
  nums.sort((a, b) => a - b)

  let i = 0
  while (i < n) {
    const j = i
    while (i < n && nums[i] - nums[j] <= k)
      i++

    res++
  }

  return res
};