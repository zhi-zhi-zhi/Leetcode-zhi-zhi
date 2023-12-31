function hasValidPath(grid: string[][]): boolean {
  const m = grid.length
  const n = grid[0].length
  if (grid[0][0] !== '(' || grid[m - 1][n - 1] !== ')')
    return false

  let count = 0
  const memo = new Map()
  return dfs(0, 0, count)

  function dfs(x: number, y: number, count: number): boolean {
    if (x >= m || y >= n)
      return false
    if (x === m - 1 && y === n - 1)
      return count === 1
    if (memo.has(`${x}_${y}_${count}`))
      return false
    memo.set(`${x}_${y}_${count}`, 1)

    if (grid[x][y] === '(') {
      count++
      if (count > (m - 1 - x) + (n - 1 - y)) {
        return false
      }
    } else {
      count--
      if (count < 0) {
        return false
      }
    }

    return dfs(x + 1, y, count) || dfs(x, y + 1, count)
  }
}


// console.log(hasValidPath([['(', '(', ')', '(', '(', ')', '(', ')', '('], [')', '(', '(', '(', ')', ')', ')', '(', '('], ['(', ')', ')', '(', '(', ')', '(', '(', '('], ['(', '(', ')', '(', ')', '(', '(', ')', '('], ['(', ')', '(', ')', ')', ')', '(', ')', ')']]))
console.log(hasValidPath([['(', ')', ')', '(', '(', '(', '(', ')', ')', '(', ')', '(', ')', '(', '(', '(', '(', ')', '(', ')', '('], ['(', '(', ')', ')', '(', ')', ')', ')', '(', ')', '(', ')', '(', '(', ')', '(', '(', '(', '(', '(', ')'], [')', ')', '(', ')', ')', '(', '(', ')', '(', '(', ')', '(', ')', ')', '(', ')', ')', '(', '(', ')', ')'], ['(', '(', ')', '(', ')', '(', ')', ')', ')', '(', ')', '(', '(', ')', '(', ')', ')', '(', ')', ')', ')'], ['(', '(', '(', ')', '(', '(', ')', '(', ')', ')', '(', ')', ')', ')', ')', ')', ')', '(', ')', '(', '('], [')', ')', '(', '(', ')', ')', ')', ')', ')', '(', ')', ')', ')', '(', '(', ')', '(', '(', '(', '(', ')'], [')', ')', ')', ')', '(', ')', '(', ')', '(', '(', ')', '(', '(', ')', '(', '(', ')', ')', '(', ')', '('], ['(', ')', '(', '(', '(', ')', ')', ')', ')', '(', '(', ')', '(', '(', ')', ')', '(', ')', ')', ')', '('], ['(', ')', '(', ')', '(', '(', '(', '(', ')', '(', '(', '(', '(', '(', '(', ')', '(', ')', '(', ')', ')'], ['(', ')', '(', '(', '(', ')', '(', ')', ')', ')', ')', '(', '(', '(', '(', ')', ')', '(', '(', '(', ')'], ['(', '(', ')', '(', ')', ')', '(', ')', '(', ')', ')', ')', ')', ')', '(', ')', '(', ')', ')', ')', '('], [')', '(', '(', '(', ')', '(', ')', ')', '(', ')', '(', ')', '(', '(', ')', '(', '(', ')', '(', '(', ')'], ['(', ')', '(', ')', ')', '(', '(', ')', '(', ')', '(', ')', ')', ')', '(', '(', '(', '(', ')', '(', ')'], ['(', '(', ')', '(', ')', ')', '(', '(', '(', ')', '(', ')', '(', '(', ')', ')', '(', '(', '(', ')', ')'], ['(', '(', '(', '(', ')', ')', '(', ')', '(', '(', '(', ')', ')', '(', ')', '(', ')', ')', ')', ')', '('], ['(', '(', '(', ')', ')', ')', '(', ')', ')', '(', ')', ')', '(', '(', ')', '(', ')', '(', '(', '(', ')'], [')', ')', ')', ')', ')', ')', '(', ')', ')', ')', '(', '(', ')', '(', ')', '(', '(', '(', '(', ')', ')']]))