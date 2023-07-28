/**
 *
 * -50 <= nums[i] <= 50
 * @param nums
 * @param k
 * @param x
 */
function getSubarrayBeauty(nums: number[], k: number, x: number): number[] {
  const n = nums.length

  const res = Array(n - k + 1).fill(0)

  const bucket = Array(101).fill(0)

  for (let i = 0; i < k; i++) {
    bucket[nums[i] + 50]++
  }
  let count = 0
  for (let i = 0; i < 101; i++) {
    if ((count += bucket[i]) >= x) {
      res[0] = Math.min(i - 50, 0)
      break
    }
  }

  for (let i = k; i < n; i++) {
    bucket[nums[i - k] + 50]--
    bucket[nums[i] + 50]++
    let count = 0
    for (let j = 0; j < 101; j++) {
      if ((count += bucket[j]) >= x) {
        res[i - k + 1] = Math.min(j - 50, 0)
        break
      }
    }
  }

  return res
}


// console.log(getSubarrayBeauty([1, -1, -3, -2, 3], 3, 2))
