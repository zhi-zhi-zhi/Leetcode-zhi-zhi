function countFairPairs(nums: number[], lower: number, upper: number): number {
  nums.sort((a, b) => a - b)

  let res = 0

  const n = nums.length

  // 固定 j，找 i的范围
  // j 每次缩小 1，即 nums[j] 可能减少
  // 然后 i 的范围（left, right)，left 和 right 都是单调不递减
  // 对于每个 j
  // res += right - left + 1

  let left = 0, right = 0
  for (let j = n - 1; j >= 0; j--) {
    left = Math.min(left, j - 1)
    right = Math.min(right, j - 1)
    while (left < j && nums[left] + nums[j] < lower) left++
    while (right < j && nums[right] + nums[j] <= upper) right++

    if (left < j && right <= j) {
      res += right - left
    }
  }


  return res
};

//
// console.log(countFairPairs([1,7,9,2,5], 11, 11));
// console.log(countFairPairs([0,1,7,4,4,5], 3, 6));
// console.log(countFairPairs([0, 0, 0, 0, 0, 0], 0, 0));
