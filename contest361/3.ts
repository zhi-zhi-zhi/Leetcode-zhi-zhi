function countInterestingSubarrays(nums, modulo, k) {
  let curr = 0
  const cnt = new Map()
  let ans = 0

  // 先统计满足 mod k = i 条件的总下标有多少个
  for (const num of nums) {
    if (num % modulo === k) {
      curr += 1
      curr %= modulo
    }
    cnt.set(curr, (cnt.get(curr) ?? 0) + 1)
  }

  curr = 0
  for (const num of nums) {
    // 找到要找的前缀和模数
    const toFind = (curr + k) % modulo
    ans += cnt.get(toFind) ?? 0

    // 更新 curr
    if (num % modulo === k) {
      curr += 1
      curr %= modulo
    }

    // 当前位置的模数不再可以使用
    cnt.set(curr, (cnt.get(curr) ?? 0) - 1)
  }

  return ans
}
