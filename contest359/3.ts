function maximizeTheProfit(n: number, offers: number[][]): number {
  offers.sort((a, b) =>
    a[1] - b[1] === 0
      ? -(a[0] - b[0])
      : a[1] - b[1])

  const map = new Map<number, number[][]>()

  for (const [start, end, gold] of offers) {
    const arr = map.get(end) ?? []
    arr.push([start, end, gold])
    map.set(end, arr)
  }

  const dp = Array(n + 1).fill(-1)
  dp[0] = 0

  for (let i = 1; i <= n; i++) {
    // 1. 买房子
    // 2. 不买房子

    // 不卖
    dp[i] = Math.max(dp[i - 1])

    for (const [start, end, gold] of (map.get(i - 1) ?? [])) {
      dp[i] = Math.max(dp[i], dp[start] + gold)
    }
  }

  return dp[n]
}