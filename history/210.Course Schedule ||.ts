interface Point {
  inDegree: number,
  to: number[]
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // 拓扑排序
  const graph = Array.from(Array(numCourses), () => { return {
    inDegree: 0,
    to: []
  }  as Point});

  prerequisites.forEach(([a, b]) => {
    graph[a].inDegree++;
    graph[b].to.push(a);
  })

  const queue = [] as number[];
  const result = [] as number[];

  graph.forEach((point, pointNum) => {
    if (point.inDegree === 0) {
      queue.push(pointNum)
    }
  })

  while (queue.length > 0) {
    const pointNum = queue.shift() as number;
    result.push(pointNum);

    graph[pointNum].to.forEach((toPoint) => {
      if (--graph[toPoint].inDegree === 0) {
        queue.push(toPoint)
      }
    })
  }

  return graph.every(point => point.inDegree === 0) ? result : [];
};

findOrder(4, [[1,0],[2,0],[3,1],[3,2]])