function waysToReachTarget(target: number, types: number[][]): number {
  let res = 0
  const n = types.length

  const map = new Map<string, number>()

  return dfs(target, 0)

  function dfs(leftTarget: number, index: number): number {
    if (leftTarget === 0) return 1
    if (index >= n) return 0
    if (map.has(`${leftTarget}-${index}`)) return map.get(`${leftTarget}-${index}`)!;

    let xx = 0
    const [count, mark] = types[index]

    for (let i = 0; i <= count; i++) {
      if (leftTarget < i * mark) break

      xx = (xx + dfs(leftTarget - i * mark, index + 1)) % (1e9 + 7)
    }

    map.set(`${leftTarget}-${index}`, xx)
    return xx
  }
};


waysToReachTarget(6, [[6,1],[3,2],[2,3]])
