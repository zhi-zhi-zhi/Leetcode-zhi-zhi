/**
 * 换句话说，你将选择一个起点，然后以 k 为间隔跳跃，直到到达魔法师序列的末端，在过程中吸收所有的能量。
 *
 * 给定一个数组 energy 和一个整数k，返回你能获得的 最大 能量。
 *
 * @param energy
 * @param k
 */
function maximumEnergy(energy: number[], k: number): number {
  let res = energy.at(-1)

  const dp = Array(energy.length).fill(-1e10)

  const n = energy.length


  for (let i = 0; i < n; i++) {
    if (i < k) {
      dp[i] = energy[n-1-i]
    } else {
      dp[i] = Math.max(dp[i-k] + energy[n-1-i])
    }

    res = Math.max(res, dp[i])
  }

  return res
};


// console.log(maximumEnergy([5,2,-10,-5,1], 3))
