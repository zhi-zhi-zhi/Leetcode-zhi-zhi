function minimumMoves(grid: number[][]): number {
  const len = 3
  const zeroArr = []
  const bigArr = []

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (grid[i][j] === 0) zeroArr.push(i * 3 + j)
      else if (grid[i][j] > 1) bigArr.push(i * 3 + j)

  let res = Infinity

  if (zeroArr.length === 0) return  0

  return dfs(0)


  function dfs(index: number) {
    if (index >= zeroArr.length) {
      return 0
    }
    const row = Math.floor(zeroArr[index] / 3), col = zeroArr[index] % 3

    let cost = Infinity
    // 遍历
    for (let i = 0; i < bigArr.length; i++) {
      const x = Math.floor(bigArr[i] / 3), y = bigArr[i] % 3
      if (grid[x][y] > 1) {
        grid[x][y]--
        const curCost = Math.abs(x - row) + Math.abs(y - col)
        const leftCost = dfs(index + 1)
        grid[x][y]++

        cost = Math.min(cost, curCost + leftCost)
      }
    }

    return cost
  }
}

// console.log(minimumMoves([[3,2,0],[0,1,0],[0,3,0]]))