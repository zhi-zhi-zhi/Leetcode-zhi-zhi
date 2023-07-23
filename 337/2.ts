function checkValidGrid(grid: number[][]): boolean {
  const help = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];

  const n = grid.length;

  let startX = -1, startY = -1

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        startX = i
        startY = j
        break
      }
    }
    if (startX !== -1)
      break
  }

  if (startX !== 0 || startY !== 0) return false

  return dfs(startX, startY)

  function dfs(x: number, y: number): boolean {
    if (grid[x][y] === n ** 2 - 1) return true

    let res = false
    for (const [xA, yD] of help) {
      res = res || check(x + xA, y + yD, grid[x][y])
      if (res)
        break
    }

    return res
  }

  function check(x: number, y: number, value: number): boolean {
    return 0 <= x && x < n && 0 <= y && y < n && grid[x][y] === value + 1 && dfs(x, y)
  }
};
//
// console.log(checkValidGrid([[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]));
// console.log(checkValidGrid([[24,11,22,17,4],[21,16,5,12,9],[6,23,10,3,18],[15,20,1,8,13],[0,7,14,19,2]]));
