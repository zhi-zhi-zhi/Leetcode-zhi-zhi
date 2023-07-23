function beautifulSubsets(nums: number[], k: number): number {
  const n = nums.length
  nums.sort((a, b) => a - b);
  let res = 0;
  const set = new Set<number>()
  dfs(0)

  // 减去空集
  return res - 1

  function dfs(index: number) {
    if (index === n) {
      res++;
      return
    };

    // 算自己
    if (!set.has(nums[index] - k)) {
      set.add(nums[index])
      dfs(index+1)
      set.delete(nums[index])
    }

    // 不算自己
    dfs(index + 1)
  }
};


