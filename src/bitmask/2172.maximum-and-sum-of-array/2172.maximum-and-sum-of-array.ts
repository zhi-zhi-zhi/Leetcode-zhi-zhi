function maximumANDSum(nums: number[], numSlots: number): number {
  return maximumANDSumVersion1(nums, numSlots);
};

/**
 * Base ternary
 * 在前 n 个num的所有解上，算第 n+1 的最优解
 *
 * Time complexity: O(3^numSlots * numSlots)
 * Space complexity: O(3^numSlots)
 *
 * 二分图带权最大匹配
 *
 * @param nums
 * @param numSlots
 */
function maximumANDSumVersion1(nums: number[], numSlots: number): number {
  const all = 3 ** numSlots - 1,
        dp  = Array(all + 1).fill(0),
        n   = nums.length;
  let res = Number.MIN_SAFE_INTEGER;

  for (let mask = 1; mask <= all; mask++) {
    // avoid unuseful computation and wrong answer
    let i = count(mask);
    if (i > n)
      continue;

    for (let j = 1, k = 1; j <= numSlots && k <= mask; j++, k *= 3)
      // 第 j 位上为2或1
      if (Math.floor(mask / k) % 3 > 0)
        dp[mask] = Math.max(dp[mask], dp[mask - k] + (nums[i - 1] & j));

    res = Math.max(res, dp[mask]);
  }

  return res;

  function count(numBaseTernary: number) {
    let res = 0;
    while (numBaseTernary > 0) {
      res += numBaseTernary % 3;
      numBaseTernary = Math.floor(numBaseTernary / 3);
    }
    return res;
  }
}

/**
 * Base binary
 *
 * 在把数放到前 n 个桶的所有解上，求在第n+1个桶上放上一个数时的最优解
 *
 * Time complexity: O(2^(2*numSlots)*2*numSlots)
 * Space complexity: O(2^(2**numSlots))
 *
 * 二分图带权最大匹配
 *
 * @param nums
 * @param numSlots
 */
function maximumANDSumVersion2(nums: number[], numSlots: number): number {
  nums.push(...Array(numSlots * 2 - nums.length).fill(0));
  const n  = nums.length,
        dp = Array(2 ** n).fill(0);

  for (let i = 1; i < 2 ** n; i++) {
    const slotNum = Math.floor((count(i) + 1) / 2)

    for (let j = 0; j < n; j++)
      // 第 j 位为 1
      if ((i >> j) % 2 > 0)
        dp[i] = Math.max(dp[i], dp[i - 2 ** j] + (nums[j] & slotNum));
  }

  return dp[2 ** n - 1];

  function count(numBaseBinary: number): number {
    let result = 0;
    while (numBaseBinary > 0) {
      result++;
      numBaseBinary &= (numBaseBinary - 1);
    }

    return result;
  }
}


