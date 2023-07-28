function distributeCookies(cookies: number[], k: number): number {
  let res = Number.MAX_SAFE_INTEGER
  const n = cookies.length
  const bitCookie = (1 << n) - 1
  const help = Array(k).fill(0)

  dfs(0, bitCookie)

  return res

  /**
   *
   * @param x 第 x 个人
   * @param leftCookie
   */
  function dfs(x: number, leftCookie: number) {
    if (x === k) {
      // 饼干没吃完
      if (leftCookie > 0)
        return

      res = Math.min(res, Math.max(...help))
      return
    }

    // 剩余饼干个数
    let count = 0
    for (let i = leftCookie; i > 0; i = i & (i - 1))
      count++

    // 可以吃 [1, Math.min(leftCookie, n - x) 块饼干
    // 吃掉一块饼干后，有两种选择
    // 1. 继续吃一块（还能吃
    // 2. 不吃了，下一个人吃
    for (let i = 0; i < n; i++) {
      // if (x === 0 && i === n - 1 && leftCookie === 62) {
      //   console.log(help)
      //   debugger
      // }
      if ((leftCookie & (1 << i)) > 0) {
        // 还能吃
        // console.log(count, k - x, 'xx')
        if (count >= k - x) {
          // 自己吃
          help[x] += cookies[i]
          dfs(x, leftCookie - (1 << i))
          help[x] -= cookies[i]
        }

        // if (x === 0 && i === n - 1 && leftCookie === 62) {
        //   console.log(help)
        //   debugger
        // }
        // 下一个人吃
        help[x] += cookies[i]
        dfs(x + 1, leftCookie - (1 << i))
        help[x] -= cookies[i]
      }
    }
  }
}

// console.log(distributeCookies([8, 15, 10, 20, 8], 2))
// console.log(distributeCookies([6, 1, 3, 2, 2, 4, 1, 2], 3))
console.log(distributeCookies([941,797,1475,638,191,712], 3))
// 1653 1626 1475