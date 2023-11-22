/**
 *
 * 1 <= n == nums.length <= 100
 * 1 <= nums[i] <= 100
 * 1 <= m <= 200
 *
 * @param nums
 * @param m
 */
function canSplitArray(nums: number[], m: number): boolean {
  const n = nums.length

  return dfs(0, n - 1)

  function dfs(left: number, right: number): boolean {
    if (left >= right) return true

    let sum = 0
    let minIndex = left
    for (let i = left; i <= right; i++) {
      sum += nums[i]
      if (nums[i] < nums[minIndex]) {
        minIndex = i
      }
    }

    if (sum < m) return false

    return dfs(left, minIndex) && dfs(minIndex + 1, right)
  }
};

// console.log(1)
// console.log(canSplitArray([2,2,1],4))