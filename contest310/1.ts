function mostFrequentEven(nums: number[]): number {
  const map = new Map()

  nums.forEach((num) => {
    if (num % 2 === 0) {
      map.set(num, (map.get(num) ?? 0) + 1)
    }
  })

  const res = Array.from(map.entries()).sort((a, b) => a[1] === b[1] ? a[0] - b[0] : b[1] - a[1])

  return res.length === 0 ? -1 : res[0][0]
}