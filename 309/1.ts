function longestSubarray(nums: number[], limit: number): number {
  if (nums.length === 0)
    return 0

  const n = nums.length
  let maxSubLen = 1

  const minDequeue = [nums[0]]
  const maxDequeue = [nums[0]]

  let left = 0, right = 0

  while (right < n) {
    while (maxDequeue[0] - minDequeue[0] <= limit) {
      maxSubLen = Math.max(maxSubLen, right - left + 1)

      if (++right === n)
        break

      // update the max dequeue
      // @ts-ignore
      while (maxDequeue.length > 0 && nums[right] >  maxDequeue[maxDequeue.length - 1])
        maxDequeue.pop()
      maxDequeue.push(nums[right])

      // update the min dequeue
      // @ts-ignore
      while (minDequeue.length > 0 && nums[right] < minDequeue[minDequeue.length - 1])
        minDequeue.pop()
      minDequeue.push(nums[right])
    }

    if (right === n)
      break

    if (maxDequeue[0] === nums[left])
      maxDequeue.shift()
    if (minDequeue[0] === nums[left])
      minDequeue.shift()
    left++
  }

  return maxSubLen
}

longestSubarray(
  [4,2,2,2,4,4,2,2],0)
