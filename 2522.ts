function minimumPartition(s: string, k: number): number {
  let res = 1e10
  const n = s.length
  const dp = Array<number>(n + 1).fill(1e9 + 10)

  dp[0] = 0

  for (let i = 1; i <= n; i++) {
    let value = 0

    for (let j = i - 1; j >= 0; j--) {
      value += Number(s[j]) * (10 ** ((i - 1) - j))

      if (value > k) break
      dp[i] = Math.min(dp[i], dp[j] + 1)
    }
  }

  return dp[n]
}

// console.log(minimumPartition("165462", 60))