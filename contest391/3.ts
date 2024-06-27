/**
 *
 * 1 <= nums.length <= 10**5
 * nums[i] 不是 0 就是 1
 *
 * 固定 left，寻找最右侧的 right
 * 每次 left + 1，更新right
 *
 * @param nums
 */
function countAlternatingSubarrays(nums: number[]): number {
  let res = 0

  let left = 0, right = 0
  const n = nums.length

  while (left < n) {
    // 找到右侧
    while (right < n) {
      if (right + 1 < n && nums[right + 1] !== nums[right]) {
        right++
      } else {
        break
      }
    }
    res += (1 + (right - left + 1)) * (right - left + 1) / 2

    left = right + 1
    if (right < left) {
      right = left
    }
  }

  return res
};
