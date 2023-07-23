function maximumCount(nums: number[]): number {
  return Math.max(...nums.reduce((res, num) => {
    if (num > 0)
      res[0]++
    else if (num < 0)
      res[1]++
    return res
  }, [0, 0]))
};
