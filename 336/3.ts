function beautifulSubarrays(nums: number[]): number {
  const n = nums.length
  const count = Array(32).fill(0)
  const hash = new Map<string, number>()
  let res = 0

  for (const num of nums) {
    for (let i = 0; i < 32; i++) {
      if ((num & (1 << i)) > 0) {
        count[i] = (count[i] + 1) % 2
      }
    }

    const key = count.join('-')

    ifs (hash.has(key)) {
      res += hash.get(key)!;
    }
    hash.set(key, (hash.get(key) ?? 0) + 1)
  }

  return res + (hash.get(Array(32).fill(0).join('-')) ?? 0)
};


console.log(beautifulSubarrays([4,3,1,2,4]));
