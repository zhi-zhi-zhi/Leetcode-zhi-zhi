interface Edge {
  vertex: number,
  leftMove: number
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


function reachableNodes(edges: number[][], maxMoves: number, n: number): number {
  let count = 0
  const graph = new Map<number, Map<number, number>>()
  edges.forEach(([from, to, weight]) => {
    if (graph.has(from))
      graph.get(from)!.set(to, weight + 1)
    else {
      const map = new Map<number, number>()
      map.set(to, weight + 1)
      graph.set(from, map)
    }

    [to, from] = [from, to]
    if (graph.has(from))
      graph.get(from)!.set(to, weight + 1)
    else {
      const map = new Map<number, number>()
      map.set(to, weight + 1)
      graph.set(from, map)
    }
  })

  const queue = new PriorityQueue<Edge>((a, b) => (a.leftMove - b.leftMove))
  const distance = Array(n).fill(1e15)
  distance[0] = 0
  queue.add({ vertex: 0, leftMove: maxMoves })

  while (queue.size() > 0) {
    // const { vertex, weightSum } = queue.shift()!
    const { vertex, leftMove } = queue.deleteTop()!

    if (leftMove > distance[vertex] || distance[vertex] >= maxMoves) {
      continue
    }

    // @ts-ignore
    for (const [to, weight] of (graph.get(vertex) ?? new Map()).entries()) {
      if (distance[to] > distance[vertex] + weight) {
        distance[to] = distance[vertex] + weight
        queue.add({ vertex: to, leftMove: distance[to] })
      }
    }
  }

  for (let i = 0; i < n; i++)
    if (distance[i] <= maxMoves)
      count++
  // x -- y  中间是一座桥
  // 判断从两边往桥上走，总共能走多远
  edges.forEach(([from, to, weight]) => {
    const a = distance[from] >= maxMoves ? 0 : Math.min(maxMoves - distance[from], weight)
    const b = distance[to] >= maxMoves ? 0 : Math.min(maxMoves - distance[to], weight)
    count += Math.min(a + b, weight)
  })

  return count
}

// reachableNodes([[0,1,10],[0,2,1],[1,2,2]], 6, 3)