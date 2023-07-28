function numberOfPaths(grid: number[][], k: number): number {
  const MODULE = 1e9 + 7, m = grid.length, n = grid[0].length
  const memo = Array.from(Array(m), () => Array.from(Array(n), () => Array(k).fill(-1)))

  return dfs(0, 0, 0)

  function dfs(i: number, j: number, preSum: number): number {
    // 越界
    if (i >= m || j >= n)
      return 0

    const curSum = (preSum + grid[i][j]) % k

    // 发现可以用缓存
    if (memo[i][j][curSum] > -1)
      return memo[i][j][curSum]

    // 走到终点
    if (i === m - 1 && j === n - 1)
      return memo[i][j][curSum] = (curSum === 0 ? 1 : 0)

    return memo[i][j][curSum] = (dfs(i + 1, j, curSum) + dfs(i, j + 1, curSum)) % MODULE
  }
}

