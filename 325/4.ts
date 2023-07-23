function countPartitions(nums: number[], k: number): number {
  // nums 中挑选任意个数，其和为 sum
  // k <= sum <= allSum - k

  // 1 <= nums.length, k <= 1000
  // 1 <= nums[i] <= 109

  // 注意 k <= 1000

  // 有没有啥高级结构
  // 先统计前 i-1 个数的所有和的情况
  // 统计到第 i 个数时，加上前面所有和，然后判断
  if (nums.reduce((res, num) => res + num, 0) < k * 2)
    return 0

  const map = new Map<number, number>();
  const m = 1e9 + 7;
  const n = nums.length;
  map.set(0, 1)

  for (let i = 0; i < n; i++) {
    const num = nums[i];

    // 算上前者
    const entries = Array.from(map.entries());
    for (const [key, count] of entries) {
      const curSUm = key + num;

      // 剪枝
      if (curSUm < k)
        map.set(curSUm, ((map.get(curSUm) ?? 0) + count) % m);
    }
  }

  let all = 1;
  for (let i = 0; i < n; i++)
    all = (all * 2) % m;

  return (all - (Array.from(map.values()).reduce((res, count) => res + count, 0) * 2) % m + m) % m;
};


/*
Output:
212471470
Expected:
746482883
* */

