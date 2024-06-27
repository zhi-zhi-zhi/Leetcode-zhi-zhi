/**
 * 注意，同一个包裹中的苹果可以分装到不同的箱子中。
 * @param apple
 * @param capacity
 */
function minimumBoxes(apple: number[], capacity: number[]): number {
  let res = 0

  apple.sort((a, b) => a - b)
  capacity.sort((a, b) => a - b)

  const all = apple.reduce((sum, num) => sum + num, 0)
  let sum = 0
  for (let i = capacity.length - 1; i >= 0; i--) {
    res++
    sum += capacity[i]
    if (sum >= all) return res
  }

  return res
};