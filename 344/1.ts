function distinctDifferenceArray(nums: number[]): number[] {
  const n = nums.length;
  const res = Array(n).fill(0);

  const preDiff = Array(n).fill(0);
  const beforeDiff = Array(n).fill(0);

  const set = new Set<number>();
  const set2 = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
    preDiff[i] = set.size;

    beforeDiff[n - 1 - i] = set2.size;
    set2.add(nums[n - 1 - i]);
  }

  for (let i = 0; i < n; i++)
    res[i] = preDiff[i] - beforeDiff[i]

  return res;
};
