/**
 * 1 <= nums.length <= 10**5
 * 1 <= nums[i] <= nums.length
 * 0 <= k <= nums.length
 *
 * 可以构建多重链表
 *
 * @param nums
 * @param k
 */
function longestEqualSubarray(nums: number[], k: number): number {
  let res = 1

  const map = new Map<number, number[]>()

  nums.forEach((num, index) => {
    const arr = map.get(num) ?? []
    arr.push(index)
    map.set(num, arr)
  })

  for (const arr of Array.from(map.values())) {
    // 窗口滑动
    let cost = 0
    let left = 0, right = 0

    while (right < arr.length) {
      // 计算代价
      if (right > 0) cost += (arr[right] - arr[right - 1]) - 1

      // 维持窗口
      while (cost > k) {
        cost -= (arr[left + 1] - arr[left]) - 1
        left++
      }

      // 维护最大值
      res = Math.max(res, right - left + 1)
      right++
    }
  }

  return res
}