class MyPriorityQueue<T> {
  readonly arr: T[];
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
    const { arr, compareFunc } = this;
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
    const { arr } = this;

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
    const { arr } = this;
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

    const { arr, compareFunc } = this;

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


function minimumTime(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;

  if (grid[0][1] > 1 && grid[1][0] > 1) return -1;

  const map = Array.from(Array(m), () => Array(n).fill(Number.MAX_SAFE_INTEGER));
  map[0][0] = 0;

  const pq = new MyPriorityQueue<{ cost: number, x: number, y: number }>((a, b) => a.cost - b.cost);
  pq.add({ cost: 0, x: 0, y: 0 });

  const help = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  while (pq.size() > 0) {
    const { cost, x, y } = pq.deleteTop()!;

    if (cost > map[x][y]) continue;

    for (const [xA, yA] of help) {
      const xN = x + xA, yN = y + yA;
      if (0 > xN || 0 > yN || m <= xN || n <= yN) continue

      const costN = cost + 1 >= grid[xN][yN]
        ? cost + 1
        // 往回走一步，再回到原位置，再尝试看能不能走到新位置，不能再往回....
        : (cost + 1) + Math.ceil((grid[xN][yN] - (cost + 1)) / 2) * 2;

      if (costN < map[xN][yN]) {
        map[xN][yN] = costN;
        pq.add({ cost: costN, x: xN, y: yN });
      }
    }
  }

  return map[m-1][n-1];
};


console.log(minimumTime([[0,1,3,2],[5,1,2,5],[4,3,8,6]]));
console.log(minimumTime([[0,2,4],[3,2,1],[1,0,4]]));
