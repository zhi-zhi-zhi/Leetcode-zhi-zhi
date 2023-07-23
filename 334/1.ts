function leftRigthDifference(nums: number[]): number[] {
  const n = nums.length

  const leftSum = Array(n).fill(0)
  const rightSum = Array(n).fill(0)

  for (let i = 0; i < n - 1; i++) {
    leftSum[i+1] = leftSum[i] + nums[i]
    rightSum[n-i-2] = rightSum[n-i-1] + nums[n-i-1]
  }

  return leftSum.map((num, index) => Math.abs(num - rightSum[index]))
};
