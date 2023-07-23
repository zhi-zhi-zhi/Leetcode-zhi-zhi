/**
 * 首先，一道很经典的题，
 * 给定一个正整数数组，找到最小的自然数，其不是任何 subset 的元素和
 *
 * 前提：从小到大排序
 * 推断：假设前 i 个数，subset之和 能够构成连续的自然数 [1, maxValue]
 * 那么，如果 nums[i] <= maxValue + 1, 前 i + 1 个数可以构造 [1, maxValue + nums[i]] 中任意一个值
 * 反之，如果 nums[i] > maxValue + 1，那么前 i + 1 个数，是没有办法构造出 maxValue + 1 的
 *
 * 本题亦然
 * 从小到大排序
 * 假设前 i 个数，subset 之或 能够构成连续的自然数 [1, maxValue]
 * 那么，如果 nums[i] <= maxValue + 1，那么前 i + 1 个数可以构造出 [1, maxValue | nums[i]]
 * 反之，如果 nums[i] > maxValue + 1，那么前 i + 1 个数不可能构造出 maxValue + 1
 *
 * @param {number[]} nums
 * @returns {number}
 */
function minImpossibleORV1(nums: number[]): number {
  // 思考 | 的特性
  // 0 | 0 = 0， 1 | 0 = 0 | 1 = 1 | 1 = 1
  nums.sort((a, b) => a - b);
  if (nums[0] !== 1) return 1

  let maxValue = 1

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= maxValue + 1) maxValue = maxValue | nums[i]
    else return maxValue + 1
  }

  return maxValue + 1
};


/**
 * 偷鸡角度
 *
 * 如果数组能构成连续的 2^0, 2^1, ..., 2^i
 * 则其能构成 [1, 2^(i+1)-1] 内任意一个数
 * 即 2^(i+1) 是其不能构成的最小的自然数
 *
 * 即，找到最小的 i
 *
 * 2
 * @param {number[]} nums
 * @returns {number}
 */
function minImpossibleORV2(nums: number[]): number {
  // 思考 | 的特性
  // 0 | 0 = 0， 1 | 0 = 0 | 1 = 1 | 1 = 1
  const set = new Set(nums)

  for (let i = 0; i < 30; i++) {
    if (!set.has(2 ** i)) return 2 ** i
  }

  return 2 ** 30
};
