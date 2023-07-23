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


function minCost(basket1: number[], basket2: number[]): number {
  const map1 = new Map<number, number>();
  for (const num of basket1) map1.set(num, (map1.get(num) ?? 0) + 1);

  const map2 = new Map<number, number>();
  for (const num of basket2) map2.set(num, (map2.get(num) ?? 0) + 1);

  // const newMap = new Map<number, number>()
  const pq = new MyPriorityQueue<number>((a, b) => a - b);
  const pq2 = new MyPriorityQueue<number>((a, b) => a - b);

  for (const [key, count] of Array.from(map1.entries())) {
    const count2 = map2.get(key);

    if (count2 === count) {
      // do nothing
      for (let i = 0; i < count; i++) {
        pq2.add(key)
      }
    } else if (Math.abs((count2 ?? 0) - count) % 2 === 0) {
      const diff = Math.abs((count2 ?? 0) - count);
      // newMap.set(key, diff)
      for (let i = 0; i < (diff >> 1); i++) {
        pq.add(key);
      }
    } else {
      // 必须是双数
      return -1;
    }
  }

  for (const [key, count] of Array.from(map2.entries())) {
    const count2 = map1.get(key);

    if (count2 === count) {
      // do nothing
    } else if (Math.abs((count2 ?? 0) - count) % 2 === 0) {
      if (count2 === undefined) {
        const diff = Math.abs((count2 ?? 0) - count);
        // newMap.set(key, diff)
        for (let i = 0; i < (diff >> 1); i++) {
          pq.add(key);
        }
      }
    } else {
      // 必须是双数
      return -1;
    }
  }


  const len = pq.arr.length;
  let res = 0;

  if (len === 0) return 0

  while (pq2.size() && pq.top()! > pq2.top()!) {
    pq.replaceTopAndAdjustment(pq2.deleteTop()!)
  }

  for (let i = 0; i < (len >> 1); i++) {
    res += pq.deleteTop()!;
  }

  return res;
};

console.log(minCost([84, 80, 43, 8, 80, 88, 43, 14, 100, 88],
  [32, 32, 42, 68, 68, 100, 42, 84, 14, 8]));

// [
