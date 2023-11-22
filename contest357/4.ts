function checkArray(nums: number[], k: number): boolean {
  const n = nums.length
  let arr = Array(n).fill(0)
  arr[0] = nums[0]
  let sum = nums[0]

  for (let i = 1; i < k; i++) {
    if (nums[i] < sum) return false

    arr[i] = nums[i] - sum
    sum += arr[i]
  }

  for (let i = k; i < n; i++) {
    sum -= arr[i - k]

    if (nums[i] < sum)
      return false

    arr[i] = nums[i] - sum
    sum += nums[i] - sum
  }

  return sum === arr[n - k]
}
