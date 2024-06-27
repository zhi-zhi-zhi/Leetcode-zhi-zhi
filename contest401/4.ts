/**
 *
 *
 * 1 <= rewardValues.length <= 5 * 10**4
 * 1 <= rewardValues[i] <= 5 * 10**4
 *
 *
 *
 * 直觉：考虑值域去做 dp
 *
 * max reward value：10 * 10 ** 4
 *
 * @param rewardValues
 */
function maxTotalReward(rewardValues: number[]): number {
  const dp = Array(4000).fill(false)
  dp[0] = true
  //
  rewardValues.sort((a, b) => a - b)
  let max = rewardValues.at(-1)

  // for (let i = 0; i  < rewardValues.length; i++) {
  //   const x = rewardValues[i]
  //   dp[x] = true
  //   max = Math.max(max, x)
  //
  //   // 1 <= x <= 2000
  //   for (let j = 1; j < x; j++)
  //     if (dp[j]) {
  //       max = Math.max(max, x + j)
  //       dp[j + x] = true
  //     }
  // }

  // for ()

  return max
};

console.log(maxTotalReward([10,8,17,12,10,19]))