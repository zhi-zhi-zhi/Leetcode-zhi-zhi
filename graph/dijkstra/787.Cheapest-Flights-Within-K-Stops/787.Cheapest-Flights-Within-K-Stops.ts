interface Edge {
  to: number,
  weight: number
}

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

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  const graph = new Map<number, Edge[]>()
  flights.forEach(([from, to, weight]) => {
    if (graph.has(from))
      graph.get(from)!.push({ to, weight })
    else
      graph.set(from, [{ to, weight }])
  })

  const distance = dijkstra(graph, src, n, k)
  const min = Math.min(...distance[dst])
  return min === 1e10 ? -1 : min

  function dijkstra(graph: Map<number, Edge[]>, src: number, n: number, k: number): number[][] {
    const distance = Array.from(Array(n), () => Array(k+2).fill(1e10))
    distance[src][0] = 0
    const priorityQueue = new PriorityQueue<[dist: number, vertex: number, vertextCount: number]>((a, b) => a[0] - b[0])
    priorityQueue.add([0, src, 0])

    while (priorityQueue.size() > 0) {
      const [baseDist, baseVertex, baseCount] = priorityQueue.deleteTop()!

      if (baseDist > distance[baseVertex][baseCount])
        continue
      if (baseCount > k)
        continue

      for (const { to, weight } of (graph.get(baseVertex) ?? [])) {
        if (distance[to][baseCount + 1] > baseDist + weight) {
          distance[to][baseCount + 1] = baseDist + weight
          priorityQueue.add([distance[to][baseCount + 1], to, baseCount + 1])
        }
      }
    }

    return distance
  }
}

findCheapestPrice(4
  , [[0, 1, 1], [0, 2, 5], [1, 2, 1], [2, 3, 1]]
  , 0
  , 3
  , 1)