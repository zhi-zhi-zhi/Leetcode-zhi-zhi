function minGroupsForValidAssignment(nums: number[]): number {
  const map = new Map<number, number>()

  nums.forEach(num => {
    map.set(num, (map.get(num) ?? 0) + 1)
  })

  const n = nums.length

  let res = n

  let left = 1, right = Math.min(...Array.from(map.values()))
  // 猜测法
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const curRes = can(mid)

    if (curRes === -1) {
      right = mid - 1
    } else {
      left = mid + 1
      res = Math.min(res, curRes)
    }
  }

  return res

  /**
   * 分组可分： num or num + 1
   * @param num
   */
  function can(num: number): number {
    let count = 0

    for (const val of Array.from(map.values())) {
      const x = Math.floor(num / val)
      const y = num % val
      if (y > x) return -1
      count += x
    }

    return count
  }
};