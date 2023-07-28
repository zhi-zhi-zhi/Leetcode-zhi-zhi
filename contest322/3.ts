class MyPriorityQueue<T> {
  private readonly arr: T[];
  /**
   * 小顶堆：(a, b) => a - b
   * 大顶堆：(a, b) => b - a
   */
  private compareFunc: (a: T, b: T) => number;

  constructor(compareFunc: (a: T, b: T) => number) {
    this.arr = [];
    this.compareFunc = compareFunc;
  }

  size(): number {
    return this.arr.length;
  }

  top(): T | undefined {
    return this.arr.length > 0 ? this.arr[0] : undefined;
  }

  add(val: T) {
    const {arr, compareFunc} = this;
    arr.push(val);
    percolateUp();

    /**
     * 自底向上冒泡
     * @param start
     * @param end
     */
    function percolateUp(start: number = arr.length - 1, end: number = 0) {
      if (start <= end) return;

      const originalChildValue = arr[start];
      let childIndex = start;
      let parentIndex = Math.floor((start - 1) / 2);

      while (parentIndex >= end && compareFunc(arr[parentIndex], originalChildValue) >= 0) {
        arr[childIndex] = arr[parentIndex];
        childIndex = parentIndex;
        parentIndex = Math.floor((parentIndex - 1) / 2);
      }

      arr[childIndex] = originalChildValue;
    }
  }

  deleteTop(): T | undefined {
    const {arr} = this;

    if (arr.length === 0) return undefined;
    else if (arr.length === 1) return arr.pop();

    const res = this.arr[0];
    // @ts-ignore
    arr[0] = arr.pop();
    this.percolateDown();

    return res;
  }

  /**
   * 替换堆顶元素
   */
  replaceTopAndAdjustment(val: T) {
    const {arr} = this;
    if (arr.length === 0)
      return;

    arr[0] = val;
    this.percolateDown();
  }

  // static from<T>(val: T[]): MyPriorityQueue<T> {
  //   const
  // }

  private percolateDown(start: number = 0, end: number = this.arr.length - 1) {
    if (end <= start) return;

    const {arr, compareFunc} = this;

    const originalParentVal = this.arr[start];
    let parentIndex = start,
      childIndex = parentIndex * 2 + 1;

    while (childIndex <= end) {
      // find the fit index between left child and right child
      if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
        childIndex++;
      }

      if (compareFunc(originalParentVal, arr[childIndex]) >= 0) {
        arr[parentIndex] = arr[childIndex];
        parentIndex = childIndex;
        childIndex = childIndex * 2 + 1;
      } else {
        break;
      }
    }

    arr[parentIndex] = originalParentVal;
  }
}


function minScore(n: number, roads: number[][]): number {
  // 拓扑排序
  const graph = new Map()
  roads.forEach(([from, to, cost]) => {
    if (graph.has(from))
      graph.get(from)!.push([to, cost])
    else
      graph.set(from, [[to, cost]]);

    [from, to] = [to, from]
    if (graph.has(from))
      graph.get(from)!.push([to, cost])
    else
      graph.set(from, [[to, cost]]);
  })

  return dijkstra(1, n, graph)

  function dijkstra(start: number, n: number, graph: Map<number, [to: number, cost: number][]>): number {
    const dist = Array.from(Array(n+1), () => [1e10, 1e10])
    dist[start] = [0, 1e10]
    const priQueue = new MyPriorityQueue<[dist: number, point: number, minCost: number]>((a, b) => a[2] - b[2])
    priQueue.add([0, start, 1e10])

    while (priQueue.size() > 0) {
      const [curDist, v, minCost] = priQueue.deleteTop()!
      if (dist[v][1] < minCost)
        continue

      for (const [to, cost] of (graph.get(v) ?? []))
        if (dist[to][1] > Math.min(minCost, cost)) {
          dist[to][0] = curDist + cost
          dist[to][1] = Math.min(minCost, cost)
          priQueue.add([dist[to][0], to, Math.min(minCost, cost)])
        }
    }

    return dist[n][1]
  }
}

// minScore(4,[[1,2,2],[1,3,4],[3,4,7]])