function findMatrix(nums: number[]): number[][] {
  const res: number[][] = Array.from(Array(201), () => [])
  const map = new Map<number, number>()

  for (const num of nums) {
    res[map.get(num) ?? 0].push(num)

    map.set(num, (map.get(num) ?? 0) + 1)
  }

  return res.filter(arr => arr.length !== 0)
};
