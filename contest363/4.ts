/**
 * 1 <= n == nums.length <= 10**4
 * 1 <= nums[i] <= 10**9
 *
 * 如果一组数字中每对元素的乘积都是一个完全平方数，则称这组数字是一个 完全集 。
 *
 * @param nums
 */
function maximumSum(nums: number[]): number {
  let res = 0
  const n = nums.length

  for (let i = 0; i < n; i++) {
    let cur = 0

    for (let j = 1; ; j++) {
      const index = (i + 1) * (j * j)

      if (index > n) break
      cur += nums[index - 1]
    }

    res = Math.max(res, cur)
  }


  return res
}
