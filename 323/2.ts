function longestSquareStreak(nums: number[]): number {
  let res = 0;
  nums.sort((a, b) => a - b);
  const n = nums.length
  const map = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    const num = nums[i]
    if (map.has(num)) continue

    const sqrtCount = map.get(Math.sqrt(num)) ?? 0
    res = Math.max(res, sqrtCount + 1)
    map.set(num, sqrtCount + 1)
  }


  return res < 2 ? -1 : res;
};
