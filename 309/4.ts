interface Vertex {
  node: number;
  inDegree: number;
}

/**
 * 构建两个 DAG
 * 1. 构建成功
 *    通过拓扑排序输出
 * 2. 有环，构建失败
 *    返回空数组
 *
 *  入度：一个节点有左or上的依赖
 *
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @returns {number[][]}
 */
interface Vertex {
  node: number;
  inDegree: number;
}

/**
 * 构建两个 DAG
 * 1. 构建成功
 *    通过拓扑排序输出
 * 2. 有环，构建失败
 *    返回空数组
 *
 *  入度：一个节点有左or上的依赖
 *
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @returns {number[][]}
 */
function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
  const res = Array.from(Array(k), () => Array(k).fill(0));
  let left = 0, right = k - 1, top = 0, bottom = k - 1;

  const arr1 = xxx(rowConditions);
  const arr2 = xxx(colConditions);
  if (arr1 === null || arr2 === null)
    return [];
  else {
    for (let i = 0; i < k; i++) {
      const row = i
      const col = arr2.findIndex(item => item === arr1[row])
      res[row][col] = arr1[row];
    }
  }

  return res;

  function dfs() {

  }

  function xxx(ab: number[][]): number[] | null {
    const graph = new Map();
    const inDegree = Array(k).fill(0);
    const set = new Set();
    ab.forEach(([above, below]) => {
      if (set.has(`${above}_${below}`))
        return;
      set.add(`${above}_${below}`);
      const arr = graph.get(above - 1) ?? [];
      arr.push(below - 1);
      graph.set(above - 1, arr);
      inDegree[below - 1]++;
    });
    const queue: number[] = [];
    inDegree.forEach((inDe, index) => {
      if (inDe === 0)
        queue.push(index);
    });

    let res = [];
    while (queue.length) {
      const cur = queue.shift()!;
      res.push(cur);
      for (const neighbor of (graph.get(cur) ?? [])) {
        if (--inDegree[neighbor] === 0)
          queue.push(neighbor);
      }
    }

    return res.length === k ? res.map(item => item + 1) : null;
  }
}


// buildMatrix(3, [[1, 2], [3, 2]], [[2, 1], [3, 2]]);


console.log(buildMatrix(8, [[1, 2], [7, 3], [4, 3], [5, 8], [7, 8], [8, 2], [5, 8], [3, 2], [1, 3], [7, 6], [4, 3], [7, 4], [4, 8], [7, 3], [7, 5]], [[5, 7], [2, 7], [4, 3], [6, 7], [4, 3], [2, 3], [6, 2]]));
