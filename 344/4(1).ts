function minIncrements(n: number, cost: number[]): number {
  const maxPathSumArr = Array(n).fill(0)
  const maxPathSum = calcMathPathSum(1)
  let count = 0

  calcMinIncrements(1)

  return count

  function calcMathPathSum(index: number): number {
    if (index * 2 > n) {
      maxPathSumArr[index - 1] = cost[index - 1]
      return maxPathSumArr[index - 1]
    }

    maxPathSumArr[index - 1] = cost[index - 1] + Math.max(calcMathPathSum(index * 2), calcMathPathSum(index * 2 + 1))
    return maxPathSumArr[index - 1]
  }

  function calcMinIncrements(index: number) {
    if (index > n) {
      return
    }
    if (index > 1) {
      const val = maxPathSumArr[(index >> 1) - 1] - cost[(index >> 1) - 1] - maxPathSumArr[index - 1]
      count += val
    }

    calcMinIncrements(index * 2)
    calcMinIncrements(index * 2 + 1)
  }
};
minIncrements(7,[1,5,2,2,3,3,1])