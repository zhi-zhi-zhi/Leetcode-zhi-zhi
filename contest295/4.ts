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

interface Point {
  x: number,
  y: number,
  cost: number
}

function minimumObstacles(grid: number[][]): number {
  const queue = new PriorityQueue<Point>((a, b) => a.cost - b.cost)
  const m = grid.length
  const n = grid[0].length
  const visited = Array.from(Array(m), () => Array(n).fill(false))
  const dist = Array.from(Array(m), () => Array(n).fill(1e10))

  queue.add({
    x: 0,
    y: 0,
    cost: 0
  })
  dist[0][0] = 0

  const help = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  while (queue.size() > 0) {
    const { x: curX, y: curY, cost: curCost, } = queue.deleteTop()!

    if (visited[curX][curY])
      continue
    visited[curX][curY] = true

    if (curX === m - 1 && curY === n - 1)
      return curCost

    for (const [xA, yD] of help) {
      const newX = curX + xA
      const newY = curY + yD
      if (0 <= newX && newX < m && 0 <= newY && newY < n) {
        const cost = curCost + grid[newX][newY]

        if (cost < dist[newX][newY]) {
          dist[newX][newY] = cost
          queue.add({
            x: newX,
            y: newY,
            cost
          })
        }
      }
    }
  }

  return 0
}

// console.log(minimumObstacles([[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]))