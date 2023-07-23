function numberOfPairs(nums: number[]): number[] {
  const set = new Set()
  let same = 0, single = 0

  nums.forEach((num) => {
    if (set.has(num)) {
      same++
      set.delete(num)
    } else {
      set.add(num)
    }
  })

  return [same, set.size]
};
