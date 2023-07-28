/**
 *
 * 2 <= nums.length == n <= 1000
 * -109 <= nums[i] <= 109
 * 0 <= target <= 2 * 109
 *
 * @param nums
 * @param target
 */
function maximumJumps(nums: number[], target: number): number {
  if (nums[0] === nums.at(-1)) return 0
  if (nums[0] === 0 && target === 0) return nums.at(-1) === 0 ? 0 : -1

  const n = nums.length
  const dp = Array<number>(n).fill(-1)
  dp[0] = 0

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(nums[i] - nums[j]) <= target)
        dp[j] = Math.max(dp[j], dp[i] + 1)
    }
  }

  return dp[n - 1]
};