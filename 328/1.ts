function differenceOfSum(nums: number[]): number {
  const sum = nums.reduce((res, num) => res + num, 0)
  const digitNum = nums.reduce((res, num) => res + digitSum(num), 0)

  return Math.abs(sum -digitNum)


  function digitSum(num: number): number {
    let res = 0

    while (num > 0) {
      res += num % 10
      num = Math.floor(num / 10)
    }

    return res
  }
};
