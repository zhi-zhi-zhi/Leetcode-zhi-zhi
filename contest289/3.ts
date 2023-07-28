/**
 * 学习自：https://leetcode-cn.com/problems/maximum-trailing-zeros-in-a-cornered-path/solution/by-tsreaper-ukq5/
 * @param grid
 */
function maxTrailingZeros(grid: number[][]): number {
  let res = 0
  const m = grid.length
  const n = grid[0].length
  // 当前行，从左往右，2的个数的前缀和
  const f2 = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  const f5 = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  // 当前列，从上到下，5的个数的前缀和
  const g2 = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  const g5 = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      let num = grid[i-1][j-1]
      let twoCount = 0, fiveCount = 0

      while (num % 2 === 0) {
        twoCount++
        num /= 2
      }
      while (num % 5 === 0) {
        fiveCount++
        num /= 5
      }

      f2[i][j] = f2[i][j-1] + twoCount
      f5[i][j] = f5[i][j-1] + fiveCount
      g2[i][j] = g2[i-1][j] + twoCount
      g5[i][j] = g5[i-1][j] + fiveCount
    }

  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      // 从左边出发，到上边结束
      res = Math.max(res, Math.min(f2[i][j] + g2[i-1][j], f5[i][j] + g5[i-1][j]))
      // 从左边出发，到下边结束
      res = Math.max(res, Math.min(f2[i][j] + (g2[m][j] - g2[i][j]), f5[i][j] + (g5[m][j] - g5[i][j])))
      // 从右边出发，到上边结束
      res = Math.max(res, Math.min((f2[i][n] - f2[i][j-1]) + g2[i-1][j], (f5[i][n] - f5[i][j-1]) + g5[i-1][j]))
      // 从右边出发，到下边结束
      res = Math.max(res, Math.min((f2[i][n] - f2[i][j-1]) + (g2[m][j] - g2[i][j]), (f5[i][n] - f5[i][j-1]) + (g5[m][j] - g5[i][j])))
    }

  return res
}