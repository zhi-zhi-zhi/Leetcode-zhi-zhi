function intersection(nums: number[][]): number[] {
  const map = new Map<number, number>()
  const n = nums.length

  nums.forEach(numArr => {
    numArr.forEach(num => {
      map.set(num, (map.get(num) ?? 0) + 1)
    })
  })

  return Array.from(map.entries()).filter(([num, numCount]) => {
    return numCount >= n
  })
    .map(([num, numCount]) => num)
    .sort((a, b) => a - b)
}