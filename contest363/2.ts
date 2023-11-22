/**
 * 1 <= nums.length <= 105
 * 0 <= nums[i] < nums.length
 *
 * @param nums
 */
function countWays(nums: number[]): number {
  const n = nums.length
  nums.sort((a, b) => a - b)

  let res = nums[0] > 0 ? 1 : 0

  for (let i = 0; i < n; i++) {
    const num = nums[i]

    if ((i + 1) > num && ((i + 1) >= n || (i + 1) < nums[i+1])) {
      res++
    }
  }

  return res
};