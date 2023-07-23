function maxScore(nums: number[]): number {
  nums.sort((a, b) => b - a)
  const prefix = Array(nums.length).fill(0)
  prefix[0] = nums[0]

  for (let i = 0; i < nums.length; i++)
    prefix[i+1] = prefix[i] + nums[i+1]
  return prefix.filter(num => num > 0).length
};
