function countSubarrays(nums: number[], k: number): number {
  let res = 0
  let maxValue = nums[0], count = 1
  const map = new Map<number, number>()

  let left = 0, right = 0

  /**
   * 1. 找到左边第一个 > val 的 leftIndex
   * 2. 统计 leftIndex 到目前 right 中数组元素 = val 的个数
   * 3. 若个数 >= k，res +=e
   */
  while (right < nums.length) {
    const val = nums[right]
    if (val > maxValue) {
      maxValue = val
      count = 1

      map.clear()
    } else if (val === maxValue) {
      count++
    } else {
      // do nothing
    }

    let xx = 0
    while (count >= k) {
      xx++

      if (nums[left] === maxValue) {
        count--
      }

      left++
    }
    res += xx

    right++
  }

  return res
};