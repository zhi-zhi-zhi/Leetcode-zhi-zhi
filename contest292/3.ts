function countTexts(pressedKeys: string): number {
  let res = 0
  const modulo = 1e9 + 7
  const n = pressedKeys.length
  const dp = Array(pressedKeys.length + 1).fill(1)

  for (let i = 0; i < pressedKeys.length; i++) {
    const key = pressedKeys[i]
    dp[i + 1] = dp[i] % modulo
    if (i - 1 >= 0 && key === pressedKeys[i - 1]) {
      dp[i + 1] += dp[i - 1]
      dp[i+1] %= modulo

      if (i - 2 >= 0 && key === pressedKeys[i - 2]) {
        dp[i + 1] += dp[i - 2]
        dp[i+1] %= modulo

        if ((key === '7' || key === '9') && i - 3 >= 0 && key === pressedKeys[i - 3]) {
          dp[i + 1] += dp[i - 3]
          dp[i+1] %= modulo
        }
      }
    }
  }

  return dp[n]
}

// console.log(countTexts("222222222222222222222222222222222222") === 82876089)