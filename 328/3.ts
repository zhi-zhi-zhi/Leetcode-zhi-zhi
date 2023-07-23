function countGood(nums: number[], k: number): number {
  const map = new Map<number, number>();
  const n = nums.length

  let res = 0;

  // 对于 nums[i]
  // 只考虑 z....i 个元素满足 k 的情况
  // 如果满足， + (z + 1)

  // 考虑 left 指针（递增）
  // 对于每个 i
  // 找到最大的 left
  // 使其满足 left...i 满足 k....

  let sameCount = 0
  let left = 0

  for (let i = 0; i < n; i++) {
    const num = nums[i]

    sameCount += map.get(num) ?? 0
    map.set(num, (map.get(num) ?? 0) + 1)

    if (sameCount >= k) {
      while (sameCount >= k) {
        const numCount = map.get(nums[left])!

        map.set(nums[left], numCount - 1)
        sameCount -= numCount - 1

        left++
      }
      left--
      map.set(nums[left], map.get(nums[left])! + 1)
      sameCount += map.get(nums[left])! - 1

      res += left + 1
    }
  }


  return res;
};

