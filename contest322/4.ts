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


function magnificentSets(n: number, edges: number[][]): number {
  /**
   *  不连通的图分成 m 个连通的图
   *  每个连通图尝试按规则建立 group
   *
   *  若 m 个group建立成功，答案为各 group length 之和
   *  若建立失败，则返回 - 1
   *
   *  难点：
   *  1. 分图
   *  2. 建 group
   */

  const inDegree = Array(n).fill(0)
  const graph = new Map<number, number[]>()
  edges.forEach(([from, to]) => {
    from--
    to--
    inDegree[from]++
    inDegree[to]++

    if (graph.has(from))
      graph.get(from)!.push(to)
    else
      graph.set(from, [to]);

    [from, to] = [to, from]
    if (graph.has(from))
      graph.get(from)!.push(to)
    else
      graph.set(from, [to]);
  })

  // 可以作为出发点的个数
  const arr: number[] = []
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 1) {
      arr.push(i)
    }
  }

  const visited = Array(n).fill(false)
  let res = 0
  for (let i = 0; i < inDegree.length; i++) {
    if (!visited[i] && inDegree[i] === 1) {
      // 拓扑排序
      res += dijkstra(i, graph)
    }
  }

  for (let i = 0; i < n; i++)
    if (!visited[i]) {
      if (inDegree[i] > 1)
        return -1
      else
        res++
    }

  return res

  function dijkstra(start: number, graph: Map<number, number[]>): number {
    const queue = [start]
    let i = 0

    while (queue.length > 0) {
      i++
      const next: number[] = []

      for (const node of queue) {
        inDegree[node] = 1
        visited[node] = true
        for (const neighbor of (graph.get(node) ?? [])) {
          if (!visited[neighbor]) {
            visited[neighbor] = true
            next.push(neighbor)
          }
        }
      }

      queue.splice(0, queue.length, ...next)
    }

    return i
  }
};

magnificentSets(26
  ,[[9,16],[8,3],[20,21],[12,16],[14,3],[7,21],[22,3],[22,18],[11,16],[25,4],[2,4],[14,21],[23,3],[17,3],[2,16],[24,16],[13,4],[10,21],[7,4],[9,18],[14,18],[14,4],[14,16],[1,3],[25,18],[17,4],[1,16],[23,4],[2,21],[5,16],[24,18],[20,18],[19,16],[24,21],[9,3],[24,3],[19,18],[25,16],[19,21],[6,3],[26,18],[5,21],[20,16],[2,3],[10,18],[26,16],[8,4],[11,21],[23,16],[13,16],[25,3],[7,18],[19,3],[20,4],[26,3],[23,18],[15,18],[17,18],[10,16],[26,21],[23,21],[7,16],[8,18],[10,4],[24,4],[7,3],[11,18],[9,4],[26,4],[13,21],[22,16],[22,21],[20,3],[6,18],[9,21],[10,3],[22,4],[1,18],[25,21],[11,4],[1,21],[15,3],[1,4],[15,16],[2,18],[13,3],[8,21],[13,18],[11,3],[15,21],[8,16],[17,16],[15,4],[12,3],[6,4],[17,21],[5,18],[6,16],[6,21],[12,4],[19,4],[5,3],[12,21],[5,4]])