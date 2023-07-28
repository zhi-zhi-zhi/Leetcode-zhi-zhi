/**
 * 1 <= rectangles.length, points.length <= 5 * 104
 * rectangles[i].length == points[j].length == 2
 * 1 <= li, xj <= 109
 * 1 <= hi, yj <= 100
 *
 * @param rectangles
 * @param points
 */
function countRectangles(rectangles: number[][], points: number[][]): number[] {
  rectangles.sort(([l1, h1], [l2, h2]) => {
    if (h1 === h2)
      return l1 - l2
    else
      return h1 - h2
  })
  // 记录每一层高度的起始位置、结束位置
  const map = new Map<number, number[]>()
  let preH = -1
  let start = -1
  let end = -1
  rectangles.forEach(([l, h], index) => {
    if (preH === -1) {
      start = index
      end = index
    } else if (preH === h) {
      end = index
    } else if (preH !== h) {
      map.set(preH, [start, end])
      start = index
      end = index
    }

    preH = h
  })
  if (preH !== -1)
    map.set(preH, [start, end])

  const n = points.length
  const res = Array(n).fill(0)


  points.forEach(([x, y], index) => {
    for (let high = y; high <= 100; high++) {
      res[index] += getCountInH(x, high)
    }
  })


  return res

  function getCountInH(x: number, high: number): number {
    let [left, right] = map.get(high) ?? [0, -1]
    const [start, end] = [left, right]

    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2)

      if (x <= rectangles[mid][0])
        right = mid - 1
      else
        left = mid + 1
    }

    // 总个数减去不符合的个数
    // return (end - start + 1) - (left - start)
    return end - (left - 1)
  }
}

// console.log(countRectangles([[1,1],[2,2],[3,3]], [[4,4],[2,2],[1,3],[1,1]]))

function maxProfit(inventory: number[], orders: number): number {
  let left = 0, right = Math.max(...inventory)

  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2)

    if (check(mid))
      // 至少会触发一次
      left = mid + 1
    else
      right = mid - 1
  }

  let ordersN = BigInt(orders)
  const modulo = BigInt(1e9 + 7)
  const x = BigInt(left - 1)
  // 计算结果
  let res = BigInt(0)
  inventory.forEach((inv) => {
    const item = BigInt(inv)
    if (item >= x) {
      // @ts-ignore
      res = (res + (item + (x + 1n)) * (item -x) / 2n) % modulo
      ordersN -= (item - x)
    }
  })
  res = (res + ordersN * x) % modulo

  return Number(res)


  function check(num: number): boolean {
    return inventory.reduce((sum, item) => sum += Math.max(item + 1 - num, 0) , 0) >= orders
  }
};
// maxProfit([2, 5]
//   , 4)
// maxProfit([2, 3, 4, 5, 6, 7, 8, 9, 19]
//   , 65)
maxProfit(

  [1000000000],1000000000)