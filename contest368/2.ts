function minimumSum(nums: number[]): number {
  const n = nums.length
  const leftMin = Array(n).fill(Number.MAX_SAFE_INTEGER)
  const rightMin = Array(n).fill(Number.MAX_SAFE_INTEGER)

  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], nums[i - 1])
    rightMin[n - i - 1] = Math.min(rightMin[n - i], nums[n - i])
  }

  let res = Number.MAX_SAFE_INTEGER
  let flag = false

  for (let i = 1; i < n - 1; i++) {
    if (leftMin[i] < nums[i] && nums[i] > rightMin[i]) {
      flag = true
      res = Math.min(res, leftMin[i] + nums[i] + rightMin[i])
    }
  }

  if (flag === false) return -1

  return res
}