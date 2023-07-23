/**
 * 优先队列
 */

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

  // static from<T>(val: T[]): PriorityQueue<T> {
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

  return { add, union, find, isConnected, getCount, getRank, getRoots, getParent };
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

// function maximumBobPoints(numArrows: number, aliceArrows: number[]): number[] {
//   const dp = twoDimensionArr(12, numArrows + 1, -1);
//   const map = new Map<string, number[]>();
//
//   dfs(11, numArrows);
//
//
//   return map.get(`11_${numArrows}`);
//
//   function dfs(section: number, leftNumArr: number): number {
//     if (section <= 0) {
//       const pre = Array(aliceArrows.length).fill(0);
//       pre[0] = leftNumArr;
//       map.set(`${section}_${leftNumArr}`, pre);
//       return 0;
//     } else if (leftNumArr <= 0) {
//       return 0;
//     } else if (dp[section][leftNumArr] !== -1) {
//       return dp[section][leftNumArr];
//     }
//     const unique = `${section}_${leftNumArr}`;
//
//     // 得section分 或者不得 section 分
//     // 1. 如果要得分，得付出一定代价，先判断能否负的起
//     let r1 = -1;
//     const r2 = dfs(section - 1, leftNumArr);
//     if (leftNumArr > aliceArrows[section]) {
//       r1 = section + dfs(section - 1, leftNumArr - (aliceArrows[section] + 1));
//       dp[section][leftNumArr] = Math.max(r1, r2);
//
//       if (r1 >= r2) {
//         let pre = map.get(`${section - 1}_${leftNumArr - (aliceArrows[section] + 1)}`) ?? Array(aliceArrows.length).fill(0);
//         pre[section] = aliceArrows[section] + 1;
//         map.set(unique, [...pre]);
//       } else {
//         let pre = map.get(`${section - 1}_${leftNumArr}`) ?? Array(aliceArrows.length).fill(0);
//         pre[section] = 0;
//         map.set(unique, [...pre]);
//       }
//     } else {
//       dp[section][leftNumArr] = r2;
//       let pre: undefined | number[] = map.get(`${section - 1}_${leftNumArr}`) ?? Array(aliceArrows.length).fill(0);
//       pre[section] = 0;
//       map.set(unique, [...pre]);
//     }
//
//     return dp[section][leftNumArr];
//   }
// }

// maximumBobPoints( 9, [1,1,0,1,0,0,2,1,0,1,2,0])

interface neighbor {
  key: string,
  val: number
}

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const unionMap = useUnionFindMap<string>();
  equations.forEach(([a, b]) => {
    unionMap.union(a, b);
  });

  const n = queries.length;
  // 默认 - 1
  const res = Array(n).fill(-1);

  const graph = new Map<string, neighbor[]>();
  // 建图
  equations.forEach(([a, b], index) => {
    // const neighbors = (graph.get(a) ?? []);
    // neighbors.push({ key: b, val: values[index] });
    // graph.set(a, neighbors);
    // 上面的效率低一些
    // 下面高一点
    let val = values[index];
    if (graph.has(a))
      graph.get(a)!.push({ key: b, val });
    else
      graph.set(a, [{ key: b, val }]);

    [a, b, val] = [b, a, 1 / val];
    if (graph.has(a))
      graph.get(a)!.push({ key: b, val });
    else
      graph.set(a, [{ key: b, val }]);
  });

  // 还有很多可以预处理的点，进一步优化
  // bfs
  const parent = unionMap.getParent();
  queries.forEach(([a, b], index) => {
    // 在同一个图中才进行计算
    // 优化：若不存在 or 不在一个图中，则为初始值 -1
    if (parent.has(a) && parent.has(b) && unionMap.isConnected(a, b)) {
      // 最多 20 次遍历
      // 不需要用到优先队列
      // 其实就是找到 a -> b 的路径，并记录路径上的值
      const queue = [{ key: a, val: 1 }];
      // 记录已经访问过的节点
      const visited = new Set<string>();

      while (queue.length > 0) {
        // shift 其实不太友好，用基于堆的优先队列，效率贵会高一些（O(N) -> O(log(n))）
        const { key: curKey, val: curVal } = queue.shift()!;

        if (visited.has(curKey))
          continue;
        if (curKey === b) {
          res[index] = curVal;
          break;
        }
        visited.add(curKey);

        // for (const { key, val} of (graph.get(curKey) ?? []))
        // 能保证一定不是 undefined
        for (const { key, val } of graph.get(curKey)!) {
          if (visited.has(key))
            continue
          queue.push({ key, val: curVal * val})
        }
      }
    }

    return res
  });

  return res;
}


// console.log(calcEquation([["a","b"],["b","c"]]
//   ,[2.0,3.0]
//   ,[["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]));

function numberOfWeakCharacters(properties: [number, number][]): number {
  // 先按照 attack 进行排序
  // 对于第 i (0 <= i<= n-1, base 0) 个元素
  // 从后向前，维护最大 denseness 值
  // 判断当前角色防御值是否小于后面的最大 defense 值
  // 若是，则当前角色为 weak 角色
  // Time complexity: O(n*log(n))
  properties.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1])
  const n = properties.length
  let res = 0
  let max = properties[n-1][1]

  for (let i = n - 2; i >= 0; i--) {
    if (properties[i][1] < max)
      res++

    max = Math.max(max, properties[i][1])
  }

  return res
};
