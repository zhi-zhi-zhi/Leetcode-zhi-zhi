/**
 *
 * 1 <= nums.length <= 20
 * 1 <= nums[i], k <= 1000
 *
 * 2^20 = 1024 * 1024
 * @param nums
 * @param k
 */
function beautifulSubsets(nums: number[], k: number): number {
  // iterate all subset
  // 3^n
  let count = 0
  // key: number
  // value: the appearance count of the number
  const map = new Map<number, number>()
  const n = nums.length
  nums.sort((a, b) => a - b)

  dfs(0)

  return count

  function dfs(index: number) {
    if (index === n) {
      count++
      return
    }


    if ((map.get(nums[index] - k) ?? 0) !== 0) {
      // If we use current number
      // exist two number that the absolute diff value is k
      // that mean not a beautiful subset
      // so don't use current number
      dfs(index + 1)
    } else {
      map.set(nums[index], (map.get(nums[index]) ?? 0) + 1)
      dfs(index + 1)
      map.set(nums[index], (map.get(nums[index]) ?? 0) - 1)

      dfs(index + 1)
    }
  }
};

beautifulSubsets(
  [2, 4, 6], 2)