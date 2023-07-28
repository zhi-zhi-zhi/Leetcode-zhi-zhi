function pivotInteger(n: number): number {
  const preSum = Array(1000).fill(0)


  for (let i = 1; i < 1000; i++) {
    preSum[i] = preSum[i-1] + i
  }

  for (let i = 1; i <= n; i++) {
    if (preSum[i] === preSum[n] - preSum[i-1])
      return i
  }

  return 0
}