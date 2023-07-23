/**
 * 总共有 2000 个点
 * 一个带走一个点
 * @param {number[][]} tasks
 * @returns {number}
 */
function findMinimumTime(tasks: number[][]): number {
  tasks.sort((a, b) =>
    a[0] === b[0]
      ? b[1] - a[1]
      : a[0] - b[0],
  );
  let leftAllWater = tasks.reduce((sum, task) => sum + task[2], 0)
  let time = 0;

  while (leftAllWater > 0) {
    const theLastEnd = Math.max(...tasks.map(task => task[2] > 0? task[1] : -1))
    const waterLevel = Array(theLastEnd + 1).fill(0);
    let maxLevelStart = -1, max = 0;

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const start = task[0], end = task[1], duration = task[2];

      if (duration > 0) {
        waterLevel[start] += 1;
        waterLevel[end + 1] -= 1;
      }
    }

    for (let i = 1; i < waterLevel.length; i++) {
      waterLevel[i] += waterLevel[i - 1]
      if (max < waterLevel[i]) {
        max = waterLevel[i];
        maxLevelStart = i;
      }
    }

    [].reduce()
    time += 1;
    leftAllWater -= max


    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const start = task[0], end = task[1], duration = task[2];
      if (start <= maxLevelStart && end >= maxLevelStart && duration > 0) {
        task[2] -= 1;
        task[0]++
      }
    }
  }

  return time
};


// console.log(findMinimumTime([[2,3,1],[4,5,1],[1,5,2]]));
// console.log(findMinimumTime([[1,3,2],[2,5,3],[5,6,2]]));
// console.log(findMinimumTime([[1,18,5],[3,15,1]]));
// console.log(findMinimumTime([[1,10,7],[4,11,1],[3,19,7],[10,15,2]]));
