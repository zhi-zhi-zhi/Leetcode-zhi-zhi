function maximumTripletValue(nums: number[]): number {
  const n = nums.length
  const help1 = Array(n).fill(0)
  let preMaxValue = nums[0]

  for (let i = 1; i < n; i++) {
    help1[i] = preMaxValue - nums[i]
    preMaxValue = Math.max(preMaxValue, nums[i])
  }

  let temp = help1[1]
  let res = Number.MIN_SAFE_INTEGER
  for (let i = 2; i < n; i++) {
    res = Math.max(res, nums[i] * temp)
    temp = Math.max(temp, help1[i])
  }

  return Math.max(res, 0)
};