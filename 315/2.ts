function countDistinctIntegers(nums: number[]): number {
  const set = new Set()
  console.log(nums.length);
  for (let i = 0; i < nums.length; i++) {
    // if (set.has(nums[i]))
    //   continue

    const res = convert(nums[i])
    console.log(nums[i], res);
    set.add(nums[i])
    set.add(res)
  }

  return set.size

  function convert(num: number): number {
    return Number(Array.from(String(num)).reverse().join(''))
  }
}


