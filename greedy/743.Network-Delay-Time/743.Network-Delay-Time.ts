class PriorityQueue<T> {
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

  // static from<T>(val: T[]): PriorityQueue<T> {
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

function networkDelayTime(times: number[][], n: number, k: number): number {
  const graph = new Map()
  times.forEach(([from, to, cost]) => {
    if (graph.has(from))
      graph.get(from)!.push([to, cost])
    else
      graph.set(from, [[to, cost]])
  })

  const res = dijkstra(k, n, graph)
  res.shift()

  const max = Math.max(...res)
  if (max === 1e10)
    return -1
  else
    return max

  function dijkstra(start: number, n: number, graph: Map<number, [to: number, cost: number][]>): number[] {
    const dist = Array(n+1).fill(1e10)
    dist[start] = 0
    const priQueue = new PriorityQueue<[dist: number, point: number]>((a, b) => a[0] - b[0])
    priQueue.add([0, start])

    while (priQueue.size() > 0) {
      const [curDist, v] = priQueue.deleteTop()!
      if (dist[v] < curDist)
        continue

      for (const [to, cost] of (graph.get(v) ?? []))
        if (dist[to] > curDist + cost) {
          dist[to] = curDist + cost
          priQueue.add([dist[to], to])
        }
    }

    return dist
  }
}

networkDelayTime(
[[2,1,1],[2,3,1],[3,4,1]], 4, 2)

