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


function lengthOfLIS(nums: number[], k: number): number {
  // 1. 找出递增子序列
  const arr = []

  /**
   * 关键点：优先队列
   * 记录当前最小 right
   * minRight < cur <= minRight + k，更新 minRight，len + 1
   * minRight === cur, push
   * minRight + k > cur, push
   */

  const priorityQueue = new PriorityQueue<[minRight: number, len: number]>(
    (a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0])
  for (let i = 0; i < nums.length; i++) {
    if (priorityQueue.size() === 0) {
      priorityQueue.add([nums[i], 1])
    } else {
      const [minRight, len] = priorityQueue.top()!;
      if (nums[i] === minRight) {
        priorityQueue.add([nums[i], 1])
      }
    }
  }
}

function lengthOfLISV1(nums: number[]): number {
  const increaseArr = []

  nums.forEach(num => {
    if (increaseArr.length === 0 || num <= increaseArr[increaseArr.length - 1]) {
      let left = 0,
        right = increaseArr.length - 1

      while (left <= right) {
        const mid = left + Math.floor((right - left) / 2)

        if (increaseArr[mid] < num)
          left = mid + 1
        else
          right = mid - 1
      }

      increaseArr[left] = num
    } else {
      increaseArr.push(num)
    }
  })

  return increaseArr.length
}