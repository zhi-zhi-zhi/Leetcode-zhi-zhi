function minimumFinishTime(tires: number[][], changeTime: number, numLaps: number): number {
  let minTime = Array(18).fill(1e7)

  for (let [f, r] of tires) {
    let needTime = f, i = 1

    while (needTime < f + changeTime) {
      minTime[i] = Math.min(minTime[i], needTime)
      needTime *= r
      i++
    }
  }

  const dp = Array(numLaps + 1).fill(1e15)
  dp[0] = -changeTime

  for (let i = 1; i <= numLaps; i++)
    for (let j = 1; j <= 17 && i - j >= 0; j++)
      dp[i] = Math.min(dp[i], dp[i-j] + minTime[j] + changeTime)

  return dp[numLaps]
};