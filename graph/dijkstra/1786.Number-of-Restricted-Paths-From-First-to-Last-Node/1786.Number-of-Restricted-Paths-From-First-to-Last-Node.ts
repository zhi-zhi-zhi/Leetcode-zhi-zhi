interface Edge {
  to: number,
  weight: number
}

interface Dist {
  vertex: number,
  weightSum: number
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


const MOD = 1e9 + 7

function countRestrictedPaths(n: number, edges: number[][]): number {
  let res = 0
  const graph = new Map<number, Edge[]>()
  edges.forEach(([from, to, weight]) => {
    if (graph.has(from))
      graph.get(from).push({ to, weight })
    else
      graph.set(from, [{ to, weight }]);

    [to, from] = [from, to]
    if (graph.has(from))
      graph.get(from).push({ to, weight })
    else
      graph.set(from, [{ to, weight }])
  })

  const dist = dijkstra(graph, n)
  const paths = Array(n + 1).fill(-1)
  paths[1] = 1
  dfs(graph, 1, dist)

  return dfs(graph, n, dist)

  function dfs(graph: Map<number, Edge[]>, vertex: number, dist: number[]): number {
    if (paths[vertex] !== -1) {
      return paths[vertex]
    }

    let res = 0
    for (const { to } of (graph.get(vertex) ?? [])) {
      if (dist[to] < dist[vertex]) {
        res = (res + dfs(graph, to, dist)) % MOD
      }
    }

    paths[vertex] = res
    return res
  }

  /**
   * return distance from start vertex to each vertex
   * @param graph
   * @param start
   */
  function dijkstra(graph: Map<number, Edge[]>, start: number): number[] {
    const queue = new PriorityQueue<Dist>((a, b) => a.weightSum - b.weightSum)
    const distance = Array(n+1).fill(1e15)
    distance[start] = 0
    queue.add({ vertex: start, weightSum: 0 })

    while (queue.size() > 0) {
      const { vertex, weightSum } = queue.deleteTop()!

      for (const { to, weight } of (graph.get(vertex) ?? [])) {
        if (weightSum + weight < distance[to]) {
          distance[to] = weightSum + weight
          queue.add({ vertex: to, weightSum: distance[to] })
        }
      }
    }

    return distance
  }
}