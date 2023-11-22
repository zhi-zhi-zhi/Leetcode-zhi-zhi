function constructProductMatrix(grid: number[][]): number[][] {
  const module = 12345
  const n = grid.length, m = grid[0].length
  const topToBottom = Array.from(Array(n), () => Array(m).fill(0))
  const bottomToTop = Array.from(Array(n), () => Array(m).fill(0))
  const leftToRight = Array.from(Array(n), () => Array(m).fill(0))
  const rightToLeft = Array.from(Array(n), () => Array(m).fill(0))

  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      topToBottom[i][j] = ((i > 0 ? topToBottom[i - 1][j] : 1) * grid[i][j]) % module
  for (let i = n - 1; i >= 0; i--)
    for (let j = 0; j < m; j++)
      bottomToTop[i][j] = ((i < n - 1 ? bottomToTop[i + 1][j] : 1) * grid[i][j]) % module
  for (let j = 0; j < m; j++)
    for (let i = 0; i < n; i++)
      leftToRight[i][j] = ((j > 0 ? leftToRight[i][j - 1] : 1) * grid[i][j]) % module
  for (let j = m - 1; j >= 0; j--)
    for (let i = 0; i < n; i++)
      rightToLeft[i][j] = ((j < m - 1 ? rightToLeft[i][j + 1] : 1) * grid[i][j]) % module

  const leftTop = Array.from(Array(n), () => Array(m).fill(0))
  const rightTop = Array.from(Array(n), () => Array(m).fill(0))
  const leftBottom = Array.from(Array(n), () => Array(m).fill(0))
  const rightBottom = Array.from(Array(n), () => Array(m).fill(0))

  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      leftTop[i][j] = (
        (((i > 0 && j > 0 ? leftTop[i - 1][j - 1] : 1)
          * (i > 0 ? topToBottom[i - 1][j] : 1)) % module)
        * (((j > 0 ? leftToRight[i][j - 1] : 1)
          * grid[i][j]) % module)) % module
  for (let i = n - 1; i >= 0; i--)
    for (let j = 0; j < m; j++)
      leftBottom[i][j] = (
        (((i < n - 1 && j > 0 ? leftBottom[i + 1][j - 1] : 1)
          * (i < n - 1 ? bottomToTop[i + 1][j] : 1)) % module)
        * (((j > 0 ? leftToRight[i][j - 1] : 1)
          * grid[i][j]) % module)) % module
  for (let i = 0; i < n; i++)
    for (let j = m - 1; j >= 0; j--)
      rightTop[i][j] = (
        (((i > 0 && j < m - 1 ? rightTop[i - 1][j + 1] : 1)
          * (i > 0 ? topToBottom[i - 1][j] : 1)) % module)
        * (((j < m - 1 ? rightToLeft[i][j + 1] : 1)
          * grid[i][j]) % module)) % module
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      rightBottom[i][j] = (
        (((i < n - 1 && j < m - 1 ? rightBottom[i + 1][j + 1] : 1)
          * (i < n - 1 ? bottomToTop[i + 1][j] : 1)) % module)
        * (((j < m - 1 ? rightToLeft[i][j + 1] : 1)
          * grid[i][j]) % module)) % module

  const res = Array.from(Array(n), () => Array(m).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      res[i][j] = multiplication(
        [(i > 0 && j > 0 ? leftTop[i - 1][j - 1] : 1),
          (i > 0 ? topToBottom[i-1][j] : 1),
          (i > 0 && j < m - 1 ? rightTop[i - 1][j + 1] : 1),
          (j > 0 ? leftToRight[i][j-1] : 1),
          1,
          (j < m -1 ? rightToLeft[i][j+1] : 1),
          (i < n-1 && j > 0 ? leftBottom[i + 1][j - 1] : 1),
          (i < n - 1 ? bottomToTop[i + 1][j] : 1),
          (i < n - 1 && j < m - 1 ? rightBottom[i + 1][j + 1] : 1),
        ]
      )
    }
  }

  return res
}

function multiplication(nums: number[]) {
  let res = 1
  for (const num of nums)
    res = (res * num) % 12345
  return res
}

// console.log(constructProductMatrix([[1,2],[3,4]]))