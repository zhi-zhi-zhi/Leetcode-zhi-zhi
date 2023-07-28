/**
 * 坚定原来 2n 个人都去 B 市，现有要抽出 n 个人去 A 市。
 * 安排原本要去 B 市的人 转而去A市。 那么priceA就是花费的成本， priceB就是节约下来的钱。
 * 花费越少越好， 节约的越多越好。
 * pricesA-priceB 即一顿操作后的该人去 A 城市的总成本
 * 所以priceA-priceB越小越好。最小的一半人去A， 剩下的去B
 *
 * @param costs
 */
function twoCitySchedCost(costs: number[][]): number {
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]))
  let sum = 0

  for (let i = 0; i < costs.length >> 1; i++)
    sum += costs[i][0]
  for (let i = (costs.length >> 1); i < costs.length; i++)
    sum += costs[i][1]

  return sum
}