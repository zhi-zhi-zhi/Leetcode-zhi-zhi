function countDistinct(nums: number[], k: number, p: number): number {
  const help = []
  const set = new Set<string>()
  const all = []
  const n = nums.length
  for (let len = 1; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const temp =nums.slice(i, i + len)
      if (set.has(temp.join(',')))
        continue
      all.push(temp)
      set.add(temp.join(','))
    }
  }

  return all.filter(arr => arr.reduce((sum, num) => sum += num % p === 0 ? 1 : 0, 0) <= k).length
}

console.log(countDistinct([13,4,14,13,15,4,8,13,4,12], 5, 14))

