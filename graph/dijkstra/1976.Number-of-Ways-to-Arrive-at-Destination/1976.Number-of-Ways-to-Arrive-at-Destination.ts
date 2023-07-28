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

interface edge {
  to: number,
  weight: number
}

function countPaths(n: number, roads: number[][]): number {
  const graph = new Map<number, edge[]>()
  roads.forEach(([v1, v2, weight]) => {
    if (graph.has(v1))
      graph.get(v1)!.push({ to: v2, weight })
    else
      graph.set(v1, [{ to: v2, weight }])

    if (graph.has(v2))
      graph.get(v2)!.push({ to: v1, weight })
    else
      graph.set(v2, [{ to: v1, weight }])
  })

  const res = dfs(graph, 0, n - 1)

  return res[n-1]

  function dfs(graph: Map<number, edge[]>, start: number, end: number): number[] {
    const pathWeigh = Array(n).fill(1e15)
    const counts = Array(n).fill(0)
    const queue = new PriorityQueue<[cost: number, node: number]>((a, b) => a[0] - b[0])
    queue.add([0, start])
    pathWeigh[start] = 0
    counts[start] = 1

    while (queue.size() > 0) {
      const [c, v] = queue.deleteTop()!

      if (c > pathWeigh[v])
        continue

      for (const { to, weight } of (graph.get(v) ?? [])) {
        if (c + weight < pathWeigh[to]) {
          counts[to] = counts[v]
          pathWeigh[to] = c + weight
          queue.add([pathWeigh[to], to])
        } else if (c + weight === pathWeigh[to]) {
          counts[to] = (counts[to] + counts[v]) % (1e9 + 7)
        }
      }
    }

    return counts
  }
}
