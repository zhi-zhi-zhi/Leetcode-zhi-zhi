function findSmallestInteger(nums: number[], value: number): number {
  const arr = Array(value).fill(0)

  for (const num of nums) {
    const x = num % value
    const y = (x + value) % value
    arr[y]++
  }

  const item = arr.map((item, index) => {
    return {
      value: item,
      index
    }
  }).sort((a, b) => {
    if (a.value - b.value === 0) {
      return a.index - b.index
    }

    return a.value - b.value
  }).at(0)!


  return  item.value * value + item.index
};
findSmallestInteger([3,0,3,2,4,2,1,1,0,4],5)
