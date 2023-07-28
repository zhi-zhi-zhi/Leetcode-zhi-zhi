function minSwapsCouples(row: number[]): number {
    const n = row.length
    const states = Array(n)

    for (let i = 0; i < n; i++)
        states.push(i)

    const unionFind = useUnionFindMap<number>(states)

    for (let i = 0; i < n; i += 2)
        unionFind.union(row[i], row[i+1])

    let res = 0

    for (let i = 0; i < n; i += 2) {
        if (unionFind.isConnected(i, i+ 1)) {
          // do nothing
        } else {
          unionFind.union(i, i+1)
          res++
        }
    }

    return res
}


/**
 * 更通用的并查集写法，调用 add 手动添加，or 调用 union 自动添加
 *
 * @param {T[]} iterable 元素类型为 T 的数组，用于初始化并查集
 */
function useUnionFindMap<T = unknown>(iterable: T[] = []) {
  /**
   * 连通分量个数（帮派个数）
   * @type {number}
   */
  let count = 0;
  // key 为节点， value 为节点的父节点
  const parentMap = new Map<T, T>();
  /**
   * 各个帮派的大小
   * @type {Map<T, number>}
   */
  const rankMap = new Map<T, number>();

  // 初始化并查集
  for (let key of iterable)
    add(key)

  function add(key: T): boolean {
    // 当前节点已存在
    if (parentMap.has(key))
      return false;

    parentMap.set(key, key);
    rankMap.set(key, 1);
    count++;
    return true;
  }

  /**
   * 找到 key 所在连通分量的根节点（帮派老大）
   * 若 key 不存在于当前并查集，则将其加入并查集
   * @param {T} key
   * @return {T}
   */
  function find(key: T): T {
    if (!parentMap.has(key)) {
      add(key);
      return key;
    }

    // 找到根节点
    if (parentMap.has(key) && parentMap.get(key) !== key) {
      // 当前节点不是根节点
      // 递归找到根节点
      const root = find(parentMap.get(key));
      // 路径压缩：递归的过程中，路径中的节点都指向根节点
      parentMap.set(key, root);
      return root;
    } else {
      // 当前节点是根节点
      return key;
    }
  }

  /**
   * 合并
   * @param {T} key1
   * @param {T} key2
   * @return {boolean}
   */
  function union(key1: T, key2: T): boolean {
    let root1 = find(key1);
    let root2 = find(key2);

    if (root1 === root2)
      // 已经在同一个连通分量（帮派）中
      return false;

    // 两帮派合并策略：小帮派并入大帮派
    if (rankMap.get(root1)! > rankMap.get(root2)) {
      [root1, root2] = [root2, root1];
    }

    // 两个联通分量（帮派）合并
    parentMap.set(root1, root2);
    // 维护合并后的帮派的人数
    rankMap.set(root2, rankMap.get(root1)! + rankMap.get(root2)!);
    // root1 已经并入到 root2，也就没必要再维护 root1 帮派的人数
    rankMap.delete(root1);
    // 两帮派合并成一个帮派，总帮派个数减一
    count--;
    return true;
  }

  function isConnected(key1: T, key2: T): boolean {
    return find(key1) === find(key2);
  }

  function getCount(): number {
    return count;
  }

  function getParentMap(): Map<T, T> {
    return parentMap;
  }

  function getRank(): Map<T, number> {
    return rankMap;
  }

  function getRoots(): T[] {
    const res = new Set<T>();
    for (const key of Array.from(parentMap.keys()))
      res.add(find(key));

    return Array.from(res);
  }

  return {
    add,
    union,
    find,
    isConnected,
    getCount,
    getRank,
    getRoots,
    getParentMap,
  };
}
