interface Value {
  neighbor: Set<number>
}


function isPossible(n: number, edges: number[][]): boolean {
  const map = new Map<number, Set<number>>()

  for (let i = 1; i<= n; i++) {
    map.set(i, new Set())
  }

  for (const [a, b] of edges) {
    if (map.has(a))
      map.get(a)!.add(b)
    else
      map.set(a, new Set([b]));
    if (map.has(b))
      map.get(b)!.add(a)
    else
      map.set(b, new Set([a]))
  }

  const filterPoint = []
  for (const [point, neighbor] of Array.from(map)) {
    if (neighbor.size % 2 === 1)
      filterPoint.push(point)
  }

  if (filterPoint.length === 0) return true
  if (filterPoint.length % 2 === 1) return false

  // 加一条边或者两条边
  if (filterPoint.length === 2) {
    const [a, b] = filterPoint
    let res: boolean = false
    // 加一条边，非重复
    res = res || !map.get(a)!.has(b)

    // 加两条边，找到一条他们都没关联的
    const flag = Array(n+1).fill(true)
    flag[a] = false
    flag[b] = false
    for (const item of Array.from(map.get(a)!))
      flag[item] = false
    for (const item of Array.from(map.get(b)!))
      flag[item] = false

    for (let i = 1; i <= n; i++)
      if (flag[i])
        res = res || true

    return res
  }

  if (filterPoint.length === 4) {
    // 使得图中没有重边也没有自环
    // 六种方式
    if (isFine(filterPoint)) return true
  }

  return false

  function isFine(arr: number[]): boolean {
    const [a, b, c, d] = arr

    if ((!map.get(a)!.has(b) && !map.get(c)!.has(d))
      || (!map.get(a)!.has(c) && !map.get(b)!.has(d))
      || (!map.get(a)!.has(d) && !map.get(b)!.has(c)))
      return true
    return false
  }
};

// console.log(isPossible(4,[[1,2],[2,3],[2,4],[3,4]]))