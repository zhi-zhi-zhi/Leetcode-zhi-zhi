function longestNiceSubarray(nums: number[]): number {
  let res = 1
  let cur = 1

  let orAll = nums[0]

  for (let i = 1; i < nums.length; i++) {
    while ((nums[i] & orAll) > 0) {
      orAll -= nums[i - cur]
      cur--
    }
    cur++
    orAll += nums[i]

    res = Math.max(res, cur)
  }

  return res
}
