/**
 * 1 <= nums.length <= 10 ** 5
 * 0 <= nums[i] <= 1
 *
 * @param nums
 */
function numberOfGoodSubarraySplits(nums: number[]): number {
  const n = nums.length, module = 1e9 + 7
  let res = 1

  const firstOneIndex = nums.findIndex(num => num === 1)

  if (firstOneIndex === -1) return 0
  let intervalZeroCount = 1
  for (let i = firstOneIndex; i < n; i++) {
    if (nums[i] === 1) {
      res = (res * intervalZeroCount) % module
      intervalZeroCount = 1
    } else {
      intervalZeroCount++
    }
  }


  return res
};

// console.log(numberOfGoodSubarraySplits([1,0,0,0,1,1,1,0,0,1]))