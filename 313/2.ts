function maxSum(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const preSum = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      preSum[i + 1][j + 1] = preSum[i + 1][j] + preSum[i][j + 1] - preSum[i][j] + grid[i][j];


  let res = 0;

  for (let i = 2; i < m; i++) {
    for (let j = 2; j < n; j++) {
      res = Math.max(res,
        preSum[i + 1][j + 1]
        - preSum[i + 1][j - 2]
        - preSum[i - 2][j + 1]
        + preSum[i-2][j-2]
        - grid[i-1][j]
        - grid[i-1][j-2]
      );
    }
  }

  return res;
};
