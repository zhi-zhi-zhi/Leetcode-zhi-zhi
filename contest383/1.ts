function returnToBoundaryCount(nums: number[]): number {
  let count = 0

  nums.reduce((sum, num) => {
    sum += num
    if (sum === 0) count++

    return sum
  }, 0)

  return count
};