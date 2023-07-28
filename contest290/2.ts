class PriorityQueue<T> {
  private readonly arr: T[]
  /**
   * 小顶堆：(a, b) => a - b
   * 大顶堆：(a, b) => b - a
   */
  private compareFunc: (a: T, b: T) => number

  constructor(compareFunc: (a: T, b: T) => number) {
    this.arr = []
    this.compareFunc = compareFunc
  }

  size(): number {
    return this.arr.length
  }

  top(): T | undefined {
    return this.arr.length > 0 ? this.arr[0] : undefined
  }

  add(val: T) {
    const { arr, compareFunc } = this
    arr.push(val)
    percolateUp()

    /**
     * 自底向上冒泡
     * @param start
     * @param end
     */
    function percolateUp(start: number = arr.length - 1, end: number = 0) {
      if (start <= end) return

      const originalChildValue = arr[start]
      let childIndex = start
      let parentIndex = Math.floor((start - 1) / 2)

      while (parentIndex >= end && compareFunc(arr[parentIndex], originalChildValue) >= 0) {
        arr[childIndex] = arr[parentIndex]
        childIndex = parentIndex
        parentIndex = Math.floor((parentIndex - 1) / 2)
      }

      arr[childIndex] = originalChildValue
    }
  }

  deleteTop(): T | undefined {
    const { arr } = this

    if (arr.length === 0) return undefined
    else if (arr.length === 1) return arr.pop()

    const res = this.arr[0]
    // @ts-ignore
    arr[0] = arr.pop()
    this.percolateDown()

    return res
  }

  /**
   * 替换堆顶元素
   */
  replaceTopAndAdjustment(val: T) {
    const { arr } = this
    if (arr.length === 0)
      return

    arr[0] = val
    this.percolateDown()
  }

  // static from<T>(val: T[]): PriorityQueue<T> {
  //   const
  // }

  private percolateDown(start: number = 0, end: number = this.arr.length - 1) {
    if (end <= start) return

    const { arr, compareFunc } = this

    const originalParentVal = this.arr[start]
    let parentIndex = start,
      childIndex = parentIndex * 2 + 1

    while (childIndex <= end) {
      // find the fit index between left child and right child
      if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
        childIndex++
      }

      if (compareFunc(originalParentVal, arr[childIndex]) >= 0) {
        arr[parentIndex] = arr[childIndex]
        parentIndex = childIndex
        childIndex = childIndex * 2 + 1
      } else {
        break
      }
    }

    arr[parentIndex] = originalParentVal
  }
}

/**
 * 二维数组
 * @param n
 * @param m
 * @param fillValue
 */
function twoDimensionArr<T>(n: number, m: number, fillValue: T): T[][] {
  return Array.from(Array(n), () => Array(m).fill(fillValue))
}

function countLatticePoints(circles: number[][]): number {
  // 存放已计算过的节点
  const set = new Set<string>()
  let res = 0

  // @ts-ignore
  circles.forEach(circle => res += getPointsInCircle(circle))

  return res

  /**
   * 计算每个圆内有多少点（排除已计算过的）
   * 依赖外部状态，非幂等
   *
   */
  function getPointsInCircle(circle: [x: number, y: number, r: number]): number {
    const [x, y, r] = circle
    let pointCount = 0

    for (let i = 0; i <= r; i++) {
      for (let j = 0; j <= r; j++) {
        if (i ** 2 + j ** 2 > r ** 2)
          break

        // 第一象限
        if (!set.has(`${x+i}_${y+j}`)) {
          set.add(`${x+i}_${y+j}`)
          pointCount++
        }

        // 第二象限
        if (!set.has(`${x-i}_${y+j}`)) {
          set.add(`${x-i}_${y+j}`)
          pointCount++
        }

        // 第三象限
        if (!set.has(`${x+i}_${y-j}`)) {
          set.add(`${x+i}_${y-j}`)
          pointCount++
        }

        // 第四象限
        if (!set.has(`${x-i}_${y-j}`)) {
          set.add(`${x-i}_${y-j}`)
          pointCount++
        }
      }
    }

    return pointCount
  }
}


class UndergroundSystem {
  checkInMap: Map<number, { stationName: string, t: number}>
  checkMap: Map<string, { allTime: number, count: number }>
  constructor() {
    this.checkInMap = new Map()
    this.checkMap = new Map()
  }

  checkIn(id: number, stationName: string, t: number): void {
    if (this.checkInMap.has(id))
      return

    this.checkInMap.set(id, { stationName, t })
  }

  checkOut(id: number, stationName: string, t: number): void {
    const checkInInfo = this.checkInMap.get(id)
    if (checkInInfo === undefined)
      return
    const newCheckInfo = this.checkMap.get(`${checkInInfo.stationName}-${stationName}`) ?? { allTime: 0, count: 1}
    newCheckInfo.count++
    newCheckInfo.allTime += t - checkInInfo.t
    this.checkMap.set(`${checkInInfo.stationName}-${stationName}`, newCheckInfo)
    this.checkInMap.delete(id)
  }

  getAverageTime(startStation: string, endStation: string): number {
    const info = this.checkMap.get(`${startStation}-${endStation}`)
    if (info)
      return info.allTime / info.count
    else
      return -1
  }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */