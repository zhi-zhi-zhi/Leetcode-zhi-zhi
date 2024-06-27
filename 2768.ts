/**
 *
 * 2 <= m <= 105
 * 2 <= n <= 105
 * 0 <= coordinates.length <= 104
 * coordinates[i].length == 2
 * 0 <= coordinates[i][0] < m
 * 0 <= coordinates[i][1] < n
 * coordinates 中的坐标对两两互不相同。
 *
 * @param m
 * @param n
 * @param coordinates
 */
function countBlackBlocks(m: number, n: number, coordinates: number[][]): number[] {
  const len = coordinates.length
  const res = Array<number>(5).fill(0)

  // 直接从四个纬度进行统计

  // 1. 左上角是 black

  // 2. 右上角是 black，左上角是 white

  // 3. 左下角是 black，左上、右上是 white

  // 4. 右下角是 black，左上、右上、左下 是 white

  // tip: 一个坐标点，自己可以是 左上、右上、左下、右下（边界判断）

  const maxValue = m * n - 1
  const blackValueArr = coordinates.map(item => item[0] * n + item[1])
  const blackSet = new Set<number>(blackValueArr)

  for (const value of blackValueArr) {
    res[leftTop(value)]++
    res[rightTop(value)]++
    res[leftBottom(value)]++
    res[rightBottom(value)]++
  }

  res[0] = (m - 1) * (n - 1) - res[1] - res[2] - res[3] - res[4]

  return res


  /**
   * 1. 左上角是 black
   * @param value
   */
  function leftTop(value: number): number {
    // 边界检查
    if (value % n === (n - 1) || Math.trunc(value / n) === (m - 1)) return 0

    let blackCount = 1
    if (blackSet.has(value + 1)) blackCount++
    if (blackSet.has(value + n)) blackCount++
    if (blackSet.has(value + n + 1)) blackCount++

    return blackCount
  }

  /**
   * 2. 右上角是 black，左上角是 white
   * @param value
   */
  function rightTop(value: number): number {
    // 边界检查
    if (value % n === 0 || Math.trunc(value / n) === (m - 1)) return 0

    let blackCount = 1
    if (blackSet.has(value - 1)) return 0
    if (blackSet.has(value + n)) blackCount++
    if (blackSet.has(value + n - 1)) blackCount++

    return blackCount
  }

  /**
   * 3. 左下角是 black，左上、右上是 white
   * @param value
   */
  function leftBottom(value: number): number {
    // 边界检查
    if (value % n === (n - 1) || Math.trunc(value / n) === 0) return 0

    let blackCount = 1
    if (blackSet.has(value + 1)) blackCount++
    if (blackSet.has(value - n)) return 0
    if (blackSet.has(value - n + 1)) return 0

    return blackCount
  }

  /**
   * 4. 右下角是 black，左上、右上、左下 是 white
   * @param value
   */
  function rightBottom(value: number): number {
    // 边界检查
    if (value % n === 0 || Math.trunc(value / n) === 0) return 0

    let blackCount = 1
    if (blackSet.has(value - 1)) return 0
    if (blackSet.has(value - n)) return 0
    if (blackSet.has(value - n - 1)) return 0

    return blackCount
  }
};

console.log(countBlackBlocks(3, 3, [[0, 0]]))
console.log(countBlackBlocks(3, 3, [[0,0],[1,1],[0,2]]))