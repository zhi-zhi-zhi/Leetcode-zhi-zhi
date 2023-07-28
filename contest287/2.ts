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

/**
 * @param {number[][]} matches
 * @return {number[][]}
 */
var findWinners = function(matches) {
  const map = new Map<number, [winCount: number, loseCount: number]>()

  matches.forEach(([winner, loser]) => {
    if (map.has(winner)) {
      map.get(winner)[0]++
    } else {
      map.set(winner, [1, 0])
    }

    if (map.has(loser)) {
      map.get(loser)[1]++
    } else {
      map.set(loser, [0, 1])
    }
  })

  let res = []
  let loseZero = []
  let loseOne = []
  Array.from(map.entries()).forEach(([people, [winCount, loseCount] ]) => {
    if (loseCount === 0)
      loseZero.push(people)
    else if (loseCount === 1)
      loseOne.push(people)
  })

  loseZero.sort((a, b) => a - b)
  loseOne.sort((a, b) => a - b)

  return [loseZero, loseOne]
}