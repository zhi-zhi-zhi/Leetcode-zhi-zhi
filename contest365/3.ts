import { log } from "util"

/**
 * 1 <= nums.length <= 10**5
 * 1 <= nums[i] <= 10**5
 * 1 <= target <= 10**9
 *
 * @param nums
 * @param target
 */
function minSizeSubarray(nums: number[], target: number): number {
  const sum = nums.reduce((curSum, num) => curSum + num, 0)
  const n = nums.length
  let res = 0
  let selfTarget = target
  while (selfTarget > sum * 2) {
    res += n
    selfTarget -= sum
  }

  /**
   * key: 当前 sum
   * value: 当前 sum 的 index
   */
  const map = new Map<number, number>()
  map.set(0, -1)
  let curSum = 0, minTargetLen = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < 3 * n; i++) {
    curSum += nums[i % n]

    if (map.has(curSum - selfTarget)) {
      minTargetLen = Math.min(minTargetLen, i - map.get(curSum - selfTarget))
    }

    map.set(curSum, i)
  }

  return minTargetLen === Number.MAX_SAFE_INTEGER
    ? -1
    : res + minTargetLen
}

/**
 * Output:
 * -1
 * Expected:
 * 53
 */
// console.log(minSizeSubarray([5,5,4,1,2,2,2,3,2,4,2,5],56))