function maxCoins(nums: number[]): number {
  // 边界处理
  nums.unshift(1)
  nums.push(1)

  const LENGTH = nums.length
  // dp[i][j]： 第 i 个气球到第 j 个气球中间所有气球爆炸后的最大金币
  const dp = Array.from(Array(LENGTH), () => Array(LENGTH).fill(0))

  // intervalLength: 开区间长度（j - i + 1），
  for (let intervalLength = 3; intervalLength <= LENGTH; intervalLength++) {
    // 区间的开头，范围：[0, LENGTH - intervalLength]
    for (let start = 0; start <= LENGTH - intervalLength; start++) {
      const end = start + intervalLength - 1
      calcMaxCoins(start, end)
    }
  }

  return dp[0][LENGTH]

  /**
   * 计算 (start, end) 区间内的最大金币，即 dp[start][end]
   */
  function calcMaxCoins(start: number, end: number) {
    let max = 0
    // i 代表区间内最后一个被戳爆的气球
    for (let i = start + 1; i < end; i++) {
      max = Math.max(max, dp[start][i] + nums[start] * nums[i] * nums[end] + dp[i][end])
    }
    dp[start][end] = max
  }
}
