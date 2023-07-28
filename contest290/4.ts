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

  getOriginArr(): T[] {
    return this.arr
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

function fullBloomFlowers(flowers: number[][], persons: number[]): number[] {
  const n = flowers.length
  const m = persons.length
  const res = Array(m).fill(0)

  // 二分
  // live[i] 表示第i朵花开的时间
  // die[i] 表示第i朵花谢的时间
  // binary search，找到 person 所在的位置
  // 花开的个数 - 花谢的个数 => 所求的

  const live = flowers
    .map(([start, end]) => start)
    .sort((a, b) => a - b)
  const die = flowers
    .map(([start, end]) => end)
    .sort((a, b) => a - b)

  persons.forEach((time, index) => {
    res[index] = findLive(time) - findDie(time)
  })

  return res


  function findLive(time: number): number {
    // 到的时间，一朵花都没开
    if (time < live[0])
      return 0

    let left = 0, right = n - 1

    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2)

      if (time >= live[mid])
        left = mid + 1
      else
        right = mid - 1
    }

    // left 为在 time 时刻前花开的个数
    return left
  }

  function findDie(time: number): number {
    // 到的时间，一朵花都没谢
    if (time <= die[0])
      return 0

    let left = 0, right = n - 1

    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2)

      if (time > die[mid])
        left = mid + 1
      else
        right = mid - 1
    }

    // left 为在 time 时刻前花开的个数
    return left
  }
}

console.log(fullBloomFlowers([[1,10],[3,3]], [1,2,3,4,10,11]))