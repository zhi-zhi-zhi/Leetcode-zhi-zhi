function maximumSubarraySum(nums: number[], k: number): number {
  // 1. 前缀和
  const n = nums.length
  let preSum = Array(n).fill(0)
  preSum[0] = nums[0]
  for (let i = 1; i < n; i++)
    preSum[i] = preSum[i - 1] + nums[i]

  let res = 0
  const map: Map<number, number | undefined> = new Map()
  let len = 0
  for (let i = 0; i < n; i++) {
    //
    if (map.get(nums[i]) !== undefined) {
      const x = map.get(nums[i])!;
      const limit = i - len
      len = i - x
      for (let j = x; j >= limit; j--) {
        map.set(nums[j], undefined)
        // map[nums[j]] = -1
      }
    } else {
      len++
    }
    // map[nums[i]] = i
    map.set(nums[i], i)

    if (len === k) {
      res = Math.max(res, preSum[i] - (i - len === -1 ? 0 : preSum[i - len]))
      if (nums[i - len + 1] !== undefined)
        map.set(nums[i - len + 1], undefined)
      len--
    }
  }

  return res
}

// console.log(maximumSubarraySum([11,11,7,2,9,4,17,1],1))