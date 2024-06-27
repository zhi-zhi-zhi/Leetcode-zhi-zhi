/**
 * 1 <= n, m <= 1000
 * 0 <= grid[i][j] <= 9
 */
function minimumOperations(grid: number[][]): number {
  let res = 1e10
  const m = grid.length, n = grid[0].length
  // dp[col][num]: the cost of all value of the col-column is num
  // dp[col][num]: count[dp[0...m-1][col] is num] + min(dp[col-1][0...9(non-num)])
  const colNumCount = Array.from(
    Array(n),
    () => Array<number>(10).fill(0)
  )

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      colNumCount[j][grid[i][j]]++

  const dp = Array<number>(10).fill(1e9)
  // initial first column
  for (let num = 0; num <= 9; num++)
    dp[num] = m - colNumCount[0][num]

  // iterate
  for (let col = 2; col <= n; col++) {
    const nextDp = Array<number>(10).fill(1e9)
    const preHandle =
      dp.map((cost, val) => ({
        val,
        cost,
      })).sort((a, b) => a.cost - b.cost)

    for (let num = 0; num <= 9; num++) {
      let min = preHandle[0].val === num ? preHandle[1].cost : preHandle[0].cost
      nextDp[num] = min + (m - colNumCount[col - 1][num])
      // let min = 1e10
      // // can pre-handle
      // // use space to increase time
      // for (let preNum = 0; preNum <= 9; preNum++) {
      //   if (preNum === num) continue
      //   min = Math.min(dp[col - 1][preNum], min)
      // }
      //
      // dp[col][num] = min + (m - colNumCount[col - 1][num])
    }

    dp.splice(0, dp.length, ...nextDp)
  }


  return Math.min(...dp)
};

minimumOperations([[1, 0, 2], [1, 0, 2]])