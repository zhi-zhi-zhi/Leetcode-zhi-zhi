function findTheArrayConcVal(nums: number[]): number {
  let res = 0

  let left =  0, right = nums.length - 1
  const n = nums.length

  while (left <= right) {
    if (right - left > 0) {
      let leftNum = nums[left], rightNum = nums[right]
      const resNum = Number(`${leftNum}${rightNum}`)
      res += resNum
    } else {
      res += nums[left]
    }

    left++
    right--
  }

  return res
};
