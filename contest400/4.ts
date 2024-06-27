function minimumDifference(nums: number[], k: number): number {
  // 玩二进制
  let minDiff = Math.min(...nums.map((num) => Math.abs(k - num)))

  const bitMap: number[] = Array(31).fill(Number.MAX_SAFE_INTEGER)

  for (let i = nums.length - 1; i >= 0; i--) {
    let num = nums[i]

    for (const index of Array.from(bitMap).sort((a, b) => a - b)) {
      if (index == Number.MAX_SAFE_INTEGER) break

      num &= nums[index]
      minDiff = Math.min(minDiff, Math.abs(k - num))
    }

    // 更新
    for (let j = 30; j >= 0; j--)
      if (!(nums[i] & (1 << j)))
        bitMap[j] = i
  }

  return minDiff
};

// 7
// console.log(minimumDifference([22,87,5,78,94], 10))