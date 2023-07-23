function maximumGroups(grades: number[]): number {
  const n = grades.length;
  grades.sort((a, b) => a - b);
  let count = 1;
  let preSum = grades[0];
  let curSum = 0;
  let preLen = 1;
  let curLen = 0;

  for (let i = 1; i < n; i++) {
    curSum += grades[i];
    curLen++;

    if (curLen > preLen && curSum > preSum) {
      preSum = curSum;
      preLen = curLen;
      curSum = 0;
      curLen = 0;
      count++;
    }
  }

  return count;
}
