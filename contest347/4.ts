// console.log(maxIncreasingCells([[-4, 8, -3, 2, -4, -8, 7, 5, -2], [-5, 5, -7, -2, 6, -6, -8, -4, -4]]))

/**
 * 主要问题：
 * 2. dfs的时候，如何避免重复计算
 * @param mat
 */
function maxIncreasingCells(mat: number[][]): number {
  const m = mat.length, n = mat[0].length
  const rowSorted: number[][][] = Array(m)
  const colSorted: number[][][] = Array(n)

  // 2. 梯度下降
  const memo = Array.from(Array(m), () => Array<number>(n).fill(0))

  function dfs(i: number, j: number): number {
    if (memo[i][j] !== 0) return memo[i][j]

    if (rowSorted[i] === undefined) rowSorted[i] = mat[i].map((val, j) => [val, j]).sort((a, b) => a[0] - b[0])
    if (colSorted[j] === undefined) {
      let arr: number[][] = []
      for (let i = 0; i < m; i++)
        arr.push([mat[i][j], i])
      arr.sort((a, b) => a[0] - b[0])
      colSorted[j] = arr
    }

    const colLowerIndex = upperBound(rowSorted[i], mat[i][j])
    const rowLowerIndex = upperBound(colSorted[j], mat[i][j])

    let max = 0
    // 梯度下降，找最接近的值，可能有多个
    if (colLowerIndex !== -1) {
      for (let maybeCol = colLowerIndex;
           maybeCol >= 0 && rowSorted[i][maybeCol][0] === rowSorted[i][colLowerIndex][0];
           maybeCol--) {
        console.log(i, j, mat[i][colLowerIndex], mat[i][colLowerIndex])
        max = Math.max(max, dfs(i, rowSorted[i][maybeCol][1]))
      }
    }
    if (rowLowerIndex !== -1) {
      for (let maybeRow = rowLowerIndex;
           maybeRow >= 0 && colSorted[j][maybeRow][0] === colSorted[j][rowLowerIndex][0];
           maybeRow--) {
        max = Math.max(max, dfs(colSorted[j][maybeRow][1], j))
      }
    }


    // let max = Math.max(
    //   colLowerIndex === - 1 ? 0 : dfs(i, colLowerIndex),
    //   rowLowerIndex === - 1 ? 0 : dfs(rowLowerIndex, j)
    // )
    //

    memo[i][j] = max + 1
    return memo[i][j]
  }

  // 3. 计算
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) dfs(i, j)

  return Math.max(...memo.flat())
}

/**
 * 第一个 < target 的下标
 * @param nums
 * @param target
 */
function upperBound(nums: number[][], target: number): number {
  let left = 0, right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    // if (nums[mid] <= target) {
    //   left = mid + 1
    // } else {
    //   right = mid - 1
    // }

    if (nums[mid][0] < target) {
      left = mid + 1
    } else if (nums[mid][0] > target) {
      right = mid - 1
    } else {
      right = mid - 1
    }
  }

  return right
}