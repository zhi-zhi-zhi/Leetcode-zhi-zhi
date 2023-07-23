/**
 * 优先队列
 */

class UnionFind<T> {
  // 指向父节点
  parent: Map<T, T>
  // 当前连通图的大小
  rank: Map<T, number>

  constructor() {
    this.parent = new Map<T, T>()
    this.rank = new Map<T, number>()
  }

  has(key: T): boolean {
    return this.parent.has(key)
  }

  add(key: T) {
    if (this.parent.has(key))
      return
    this.parent.set(key, key)
    this.rank.set(key, 1)
  }

  find(key: T): T {
    if (!this.parent.has(key))
      this.add(key)

    if (this.parent.get(key) === key) {
      return key
    } else {
      const root = this.find(this.parent.get(key))
      this.parent.set(key, root)
      return root
    }
  }

  union(a: T, b: T) {
    let aRoot = this.find(a)
    let bRoot = this.find(b)

    if (aRoot === bRoot) return

    if (this.rank.get(aRoot) < this.rank.get(bRoot)) {
      [aRoot, bRoot] = [bRoot, aRoot]
    }

    this.parent.set(bRoot, aRoot)
    this.rank.set(aRoot, this.rank.get(aRoot) + this.rank.get(bRoot))
    this.rank.set(bRoot, 0)
  }

  isConnected(a: T, b: T): boolean {
    return this.find(a) === this.find(b)
  }
}
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
        childIndex  = parentIndex * 2 + 1;

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

/**
 *
 * @param iterable  元素类型为T的数组，用于初始化并查集
 * @description
 * 更加通用的并查集写法，调用add手动添加或union自动添加
 */
function useUnionFindMap<T = unknown>(iterable?: T[]) {
  let count = 0; // 连通分量个数
  const parent = new Map<T, T>();
  const rank = new Map<T, number>(); // 各个帮派的大小
  for (const key of iterable ?? []) {
    add(key);
  }

  function add(key: T): boolean {
    if (parent.has(key))
      return false;

    parent.set(key, key);
    rank.set(key, 1);
    count++;
    return true;
  }

  // 如果key不在并查集，会自动add
  function find(key: T): T {
    if (!parent.has(key)) {
      add(key);
      return key;
    }

    while (parent.has(key) && parent.get(key) !== key) {
      let p = parent.get(key)!;
      // 进行路径压缩
      p = parent.get(p)!;
      key = p;
    }
    return key;
  }

  function union(key1: T, key2: T): boolean {
    let root1 = find(key1);
    let root2 = find(key2);
    if (root1 === root2) return false;
    if (rank.get(root1)! > rank.get(root2)!) {
      ;[root1, root2] = [root2, root1];
    }
    // rank优化: 总是让大的根指向小的根
    // 翻译：两帮派合并时，小帮派合并入大帮派
    // rank在这里不是深度的意思，而是帮派人数多少的意思
    parent.set(root1, root2);
    rank.set(root2, rank.get(root1)! + rank.get(root2)!);
    count--;
    return true;
  }

  function isConnected(key1: T, key2: T): boolean {
    return find(key1) === find(key2);
  }

  function getCount(): number {
    return count;
  }

  function getParent(): Map<T, T> {
    return parent;
  }

  function getRank(): Map<T, number> {
    return rank;
  }

  function getRoots(): T[] {
    const res = new Set<T>();
    // @ts-ignore
    for (const key of parent.keys()) {
      const root = find(key);
      res.add(root);
    }
    // @ts-ignore
    return [...res];
  }

  return {add, union, find, isConnected, getCount, getRank, getRoots, getParent};
}

/**
 * 二维数组
 * @param n
 * @param m
 * @param fillValue
 */
function twoDimensionArr<T>(n: number, m: number, fillValue: T): T[][] {
  return Array.from(Array(n), () => Array(m).fill(fillValue));
}


// function divideArray(nums: number[]): boolean {
//   const n = nums.length
//   if (n % 2 === 1)
//     return false
//
//   nums.sort()
//   for (let i = 0; i < n; i+= 2) {
//     if (nums[i] !== nums[i+1])
//       return false
//   }
//
//   return true
// }
//
// function maximumSubsequenceCount(text: string, pattern: string): number {
//   const char1 = pattern.charAt(0),
//         char2 = pattern.charAt(1)
//   let char1Count = 0,
//       char2Count = 0,
//       all = 0
//
//   const arr = Array.from(text)
//
//   arr.forEach((char) => {
//     if (char === char2) {
//       char2Count++
//     }
//   })
//
//   const allChar2Count = char2Count
//
//   arr.forEach((char) => {
//     if (char === char1) {
//       char1Count++
//     }
//     if (char === char2)
//       char2Count--
//
//     if (char === char1) {
//       all += char2Count
//     }
//   })
//
//   return all + Math.max(char1Count, allChar2Count)
// }
//
// function halveArray(nums: number[]): number {
//   const sum = nums.reduce((res, num) => res += num, 0)
//   const queue = new PriorityQueue<number>((a, b) => -(a - b))
//   let op = 0,
//       reduceSum = 0
//
//   for (const num of nums)
//     queue.add(num)
//
//   while (queue.size() > 0 && reduceSum < sum / 2) {
//     const top = queue.top()
//     reduceSum += top / 2
//     queue.replaceTopAndAdjustment(top / 2)
//     op++
//   }
//
//   return op
// }


/**
 * 0: black
 * 1: white
 * @param floor
 * @param numCarpets
 * @param carpetLen
 */
function minimumWhiteTiles(floor: string, numCarpets: number, carpetLen: number): number {
  const n             = floor.length,
        arr           = Array.from(floor),
        preWhiteCount = Array(n + 1).fill(0),
        dp            = twoDimensionArr(n + 1, numCarpets + 1, 10000);
  // dp[i][j]: i, floor start; j, left carpets
  // dp[i][j]: 能减去的最多的白色瓷砖

  // const memo = new Map();

  let allWhite = 0;

  arr.forEach((char, index) => {
    if (char === "1") {
      allWhite++;
    }
    preWhiteCount[index] = allWhite;
  });
  preWhiteCount.unshift(0);

  if (numCarpets >= n) {
    return 0;
  }
  return allWhite - dfs(0, numCarpets);

  /**
   *
   * @param start
   * @param leftCarpets
   */
  function dfs(start: number, leftCarpets: number): number {
    if (dp[start][leftCarpets] !== 10000)
      return dp[start][leftCarpets];
    // if (memo.has(start + "_" + leftCarpets))
    //   return memo.get(start + "_" + leftCarpets);

    if (leftCarpets === 0)
      return 0;
    else if (start >= n)
      return 0;
    else if (start > n - leftCarpets * carpetLen) {
      dp[start][leftCarpets] = preWhiteCount[n] - preWhiteCount[start];
      // memo.set(start + "_" + leftCarpets, preWhiteCount[n] - preWhiteCount[start])
      return dp[start][leftCarpets];
    }
    dp[start][leftCarpets] = Math.max(dfs(start + carpetLen, leftCarpets - 1)
      + (preWhiteCount[Math.min(start + carpetLen, n)] - preWhiteCount[start]),
      dfs(start + 1, leftCarpets));
    // memo.set(start + "_" + leftCarpets, Math.max(dfs(start + carpetLen, leftCarpets - 1)
    //     + (preWhiteCount[Math.min(start + carpetLen, n)] - preWhiteCount[start]),
    //     dfs(start + 1, leftCarpets)));


    // return memo.get(start + "_" + leftCarpets);
    return dp[start][leftCarpets];
  }
}

