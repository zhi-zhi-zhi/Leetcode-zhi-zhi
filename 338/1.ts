function kItemsWithMaximumSum(numOnes: number, numZeros: number, numNegOnes: number, k: number): number {
  let res = 0

  res += Math.min(numOnes, k)

  k -= numOnes

  if (k > 0) k -= numZeros
  if (k > 0) res -= k

  return res
};
