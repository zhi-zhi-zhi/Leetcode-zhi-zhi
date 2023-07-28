function numRescueBoats(people: number[], limit: number): number {
  return numRescueBoatsVersion3(people, limit)
}

/**
 * 贪心
 *
 * 最理想的贪心是最重的y，然后再找满足条件中最重的x，使得 x + y <= limit，达到资源最优利用
 * 实际上该贪心可以"松弛"：对于最胖的小胖，找一个最轻的小瘦，就可以实现资源的最优利用。
 * 分析如下：
 * 设体重从轻到重为：x1, x2, x3, x4, ..., y1, y2, y3, y4
 * 对于最胖的 y4，若按严谨的贪心算法得到的是 x4，恰好满足 x4 + y4 <= limit
 * 那么易得：{x1 + y4}, {x2 + y3}, {x3 + y2}, {x4, + y1} 都满足 <= limit
 * 那么上面资源可以进行剥离，对于中间剩下的，递归同处理即可
 *
 * Time complexity: O(n * log(n))
 * Space complexity: O(1) (maybe)
 * @param people
 * @param limit
 */
function numRescueBoatsVersion1(people: number[], limit: number): number {
  people.sort((a, b) => a - b)

  let count = 0
  let left = 0, right = people.length - 1

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++
      right--
    } else {
      right--
    }

    count++
  }

  return count
}

/**
 * 利用桶排序的思想
 * Time complexity: 均摊算不清，最坏情况O(n*log(limit))
 *
 * Space complexity: O(limit)
 * @param people
 * @param limit
 */
function numRescueBoatsVersion2(people: number[], limit: number): number {
  const p = Array(limit + 1).fill(0)
  people.forEach(weight => p[weight]++)

  let count = 0

  for (let x = limit; x > 0; x--) {
    // i 代表体重为 x 的有多少个
    for (let i = p[x]; i > 0; i--) {
      // 最重的
      count++
      p[x]--

      // 找满足条件最重的
      let y = limit - x
      while (y > 0 && p[y] === 0) y--
      if (y > 0) {
        p[y]--
        if (x === y)
          i--
      }
    }
  }

  return count
}

/**
 * 利用桶排序的思想 + 贪心
 * Time complexity: O(n + limit)
 *
 * Space complexity: O(limit)
 * @param people
 * @param limit
 */
function numRescueBoatsVersion3(people: number[], limit: number): number {
  const p = Array(limit + 1).fill(0)
  people.forEach(weight => p[weight]++)

  let count = 0

  let x = limit, y = 0

  while (x > 0) {
    while (x > 0 && p[x] === 0) x--
    if (x === 0)
      break
    count++
    p[x]--

    while (x + y <= limit && p[y] === 0) y++
    if (x + y <= limit && p[y] > 0)
      p[y]--
  }

  return count
}

console.log(numRescueBoats([3,2,2,1],3))

