/**
 * 1 <= n, k <= 100
 * 0 <= budget <= 10**8
 * composition.length == k
 * composition[i].length == n
 * 1 <= composition[i][j] <= 100
 * stock.length == cost.length == n
 * 0 <= stock[i] <= 10**8
 * 1 <= cost[i] <= 100
 *
 * 所有合金都需要由同一台机器制造。
 *
 * @param n
 * @param k
 * @param budget
 * @param composition
 * @param stock
 * @param cost
 */
function maxNumberOfAlloys(n: number, k: number, budget: number, composition: number[][], stock: number[], cost: number[]): number {
  let res = 0

  // 暴力试出所有机器其所能制造的最多合金数，取最大值
  for (const arr of composition) {
    //
    let left = 0, right =  3 * (10 ** 8)

    while (left <= right) {
      const mid = left + ((right - left) >> 1)

      if (enough(mid, arr)) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    res = Math.max(res, left - 1)
  }

  function enough(num: number, arr: number[]): boolean {
    let allCost = 0
    for (let i = 0; i < arr.length; i++) {
      if (stock[i] >= arr[i] * num) continue
      allCost += (arr[i] * num - stock[i]) * cost[i]
    }
    return allCost <= budget
  }

  return res
};