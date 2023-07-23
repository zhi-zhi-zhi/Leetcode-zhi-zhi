function validPartition(nums: number[]): boolean {
  const n = nums.length
  const dp = Array(n+1).fill(false)
  dp[0] = true

  for (let i = 1; i < n; i++)
    dp[i+1] = (dp[i-1] && nums[i-1] === nums[i])
  || (i > 1 ? dp[i-2] && nums[i-1] === nums[i] && nums[i-2] === nums[i] : false)
  || (i > 1 ? dp[i-2] && nums[i] - nums[i-1] === 1 && nums[i-1] - nums[i-2] === 1 : false)

  return dp[n]
}
