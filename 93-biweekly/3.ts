/**
 * 2 <= stones.length <= 105
 * 0 <= stones[i] <= 109
 * stones[0] == 0
 * stones 中的元素严格递增。
 *
 *
 * 把数组分成两份
 * 要求两份中，两两相邻元素之差最小
 *
 * 要素：
 * 回来的时候，第一个点，一定比最后一个点小
 *
 * @param {number[]} stones
 * @returns {number}
 */
function maxJump(stones: number[]): number {
  const n = stones.length
  let res = -1

  const arr1 = [n-1]
  const arr2 = [n-1]
  for (let i = n - 2; i >= 0; i-=2) {
    arr1.push(i)
  }
  if (arr1.at(-1) !== 0)
    arr1.push(0)
  for (let i = n - 3; i >= 0; i -= 2) {
    arr2.push(i)
  }
  if (arr2.at(-1) !== 0)
    arr2.push(0)

  for (let i = 0; i < arr1.length - 1; i++) {
    res = Math.max(res, Math.abs(stones[arr1[i]] - stones[arr1[i+1]]))
  }
  for (let i = 0; i < arr2.length - 1; i++) {
    res = Math.max(res, Math.abs(stones[arr2[i]] - stones[arr2[i+1]]))
  }

  return res
};
