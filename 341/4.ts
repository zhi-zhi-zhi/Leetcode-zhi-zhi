function minimumTotalPrice(n: number, edges: number[][], price: number[], trips: number[][]): number {
  const graph: number[][] = Array.from(Array(n), () => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const count = Array(n).fill(0);

  for (const [start, end] of trips) {
    path(start, -1, end)
  }

  return Math.min(...dfs(0, -1));

  function path(cur: number, from: number, destination: number): boolean {
    if (cur === destination) {
      count[cur]++
      return true
    }

    for (const neighbor of graph[cur]) {
      if (neighbor !== from && path(neighbor, cur, destination)) {
        count[cur]++
        return true
      }
    }

    return false
  }

  /**
   * 这是一棵树，没有环，不会走回头路
   *
   * @param {number} cur
   * @param {number} from
   * @returns {[number, number]}
   */
  function dfs(cur: number, from: number): [number, number] {
    let notHalve = count[cur] * price[cur];
    let halve = notHalve >> 1;

    for (const neighbor of graph[cur])
      if (neighbor !== from) {
        const [nextNotHalve, nextHalve] = dfs(neighbor, cur);
        notHalve += Math.min(nextNotHalve, nextHalve);
        halve += nextNotHalve;
      }

    return [notHalve, halve]
  }
};

minimumTotalPrice(4
  , [[0, 1], [1, 2], [1, 3]]
  , [2, 2, 10, 6]
  , [[0, 3], [2, 1], [2, 3]]);
