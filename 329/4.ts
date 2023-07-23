/**
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] < nums.length
 *
 * 重要信息：
 * 1. 数组长度 <= 1000，可以用 n^2
 * 2. 数组内容 <= 数组长度
 *
 * dp[i][j][0]: nums i...j-1 为一组，j 单独为 1 组，最小 cost
 * dp[i][j][0] = dp[i][j-1][1] + k
 *
 * dp[i][j][1]: nums i...j 为一组，j 和前面为 1 组，最小 cost
 * dp[i][j][1] = dp[i][j-1] + has(nums[j]) ? 1 : 0
 *
 * @param {number[]} nums
 * @param {number} xxx
 * @returns {number}
 */
function minCost(nums: number[], k: number): number {
  const n = nums.length
  const dp = Array(n+1).fill(1e10)
  dp[0] = 0

  for (let i = 1; i <= n; i++) {
    const count = Array(n).fill(0)
    let t = 0

    for (let j = i - 1; j >= 0; j--) {
      const x = ++count[nums[j]]

      if (x === 2) t += 2
      else if (x > 2) t++

      dp[i] = Math.min(dp[i], dp[j] + t + k)
    }
  }

  return dp[n]
};

console.log(minCost([1,2,1,2,1], 2));
