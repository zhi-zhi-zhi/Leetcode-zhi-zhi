function edgeScore(edges: number[]): number {
  const graph = new Map<number, number[]>()

  edges.forEach((to, from) => {
    const arr = graph.get(to) ?? []
    arr.push(from)
    graph.set(to, arr)
  })

  let max = -1e10
  let num = 1e10
  for (const entry of Array.from(graph.entries())) {
    const sum = entry[1].reduce((res, cur) => res + cur, 0)
    if (sum > max) {
      max = sum
      num = entry[0]
    } else if (sum === max && entry[0] < num) {
      num = entry[0]
    }
  }

  // console.log(graph);
  return num
}


// console.log(edgeScore([1,0,0,0,0,7,7,5]));
//
