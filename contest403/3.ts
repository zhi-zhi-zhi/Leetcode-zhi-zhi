function maximumTotalCost(nums: number[]): number {
  const n = nums.length

  /**
   * dp[i][0]: 当前系数为正时的最大值
   * dp[i][1]：当前系数为负时的最大值
   */
  const dp = Array.from(
    Array(n+1),
    () => [0, 0]
  )

  dp[0][0] = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < n; i++) {
    dp[i+1][0] = Math.max(
      // 重新新建一个子数组，有两种方案
      dp[i][0] + nums[i],
      dp[i][1] + nums[i],
      // 跟上前一组屁股
      dp[i][1] + nums[i],
    )

    dp[i+1][1] = Math.max(
      // 跟在前面屁股后面
      dp[i][0] - nums[i]
    )
  }

  return Math.max(...dp[n])
};