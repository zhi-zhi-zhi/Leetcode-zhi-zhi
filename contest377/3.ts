class MyPriorityQueue<T> {
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

  getArr(): T[] {
    return this.arr
  }

  top(): T | undefined {
    return this.arr.length > 0 ? this.arr[0] : undefined
  }

  add(val: T) {
    const {arr, compareFunc} = this
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
    const {arr} = this

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
    const {arr} = this
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

    const {arr, compareFunc} = this

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


function minimumCost(source: string, target: string, original: string[], changed: string[], cost: number[]): number {
  const temp = original.map((char, index) => {
    return {
      from: char.charCodeAt(0) - 97,
      to: changed[index].charCodeAt(0) - 97,
      cost: cost[index],
      key: `${char}_${changed[index]}`
    }
  }).sort((a, b) => {
    return a.cost - b.cost
  })

  const set = new Set<string>()
  const arr = temp.filter((item) => {
    if (set.has(item.key)) return false
    set.add(item.key)
    return true
  })

  const graph: number[][][] = Array.from(Array(26), () => [])

  for (let i = 0; i < arr.length; i++) {
    const {from, to, cost} = arr[i]
    const array = graph[from] ?? []
    array.push([to, cost])

    graph[from] = array
  }

  const costArr = []
  for (let i = 0; i < 26; i++) {
    costArr[i] = dijkstra(graph, i)
  }

  // 建立索引，找到从字符 a -> b 的最小代价
  let allCost = 0

  for (let i = 0; i < source.length; i++) {
    if (source[i] === target[i]) continue
    const currentCost = costArr[source.charCodeAt(i)-97][target.charCodeAt(i) - 97]
    if (currentCost === 1e10) return -1
    allCost += currentCost
  }

  return allCost


  function dijkstra(graph: number[][][], start: number): number[] {
    const distanceArr = Array(26).fill(1e10)
    distanceArr[start] = 0

    const queue = new MyPriorityQueue<[distance: number, point: number]>((a, b) => a[0] - b[0])
    queue.add([0, start])
    while (queue.size()) {
      const [distance, x] = queue.deleteTop()!

      if (distanceArr[x] < distance)
        // 当前路径权重高于已有路径权重
        continue

      for (const [to, weight] of graph[x]) {
        const newDistance = distanceArr[x] + weight

        if (newDistance < distanceArr[to]) {
          distanceArr[to] = newDistance
          queue.add([newDistance, to])
        }
      }
    }

    return distanceArr
  }
}

// console.log(minimumCost("abcd",
//   "acbe",
//   ["a","b","c","c","e","d"],
//   ["b","c","b","e","b","e"],
//   [2,5,5,1,2,20]))