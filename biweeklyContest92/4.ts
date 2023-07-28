function countPalindromes(s: string): number {
  const M = 1e9 + 7

  // dp[i][j]: s[0, ... i] 与 s[j, ..., n-1] 中组成回文的个数
  // dp[i][j]:
  //    1. dp[i-1][j]
  //    2. dp[i][j-1]
  const n = s.length
  const count = Array.from(Array(n), () => ({}))

  for (let i = 0; i < n; i++) {
    if (i > 0)
      // @ts-ignore
      count[i] = { ...count[i - 1] }

    // @ts-ignore
    const num = Number(s[i])
    for (let j = 0; j < 10; j++) {
      // @ts-ignore
      if (count[i][j] > 0) {
        // @ts-ignore
        count[i][`${j}${num}`] = (count[i][`${j}${num}`] ?? 0) + count[i][j]
      }
    }
    // @ts-ignore
    count[i][num] = (count[i][num] ?? 0) + 1
  }

  const count2 = Array.from(Array(n), () => ({}))

  for (let i = n - 1; i >= 0; i--) {
    if (i < n)
      // @ts-ignore
      count2[i] = { ...count2[i + 1] }

    // @ts-ignore
    const num = Number(s[i])
    for (let j = 0; j < 10; j++) {
      // @ts-ignore
      if (count2[i][j] > 0) {
        // @ts-ignore
        count2[i][`${j}${num}`] = (count2[i][`${j}${num}`] ?? 0) + count2[i][j]
      }
    }
    // @ts-ignore
    count2[i][num] = (count2[i][num] ?? 0) + 1
  }

  let res = 0
  for (let i = 2; i < n - 2; i++) {
    const set = new Set()
    // 统计 0 - 99 的数量
    // 特殊: 01 -> 10
    // @ts-ignore
    for (let j = 0; j < 10; j++)
      // @ts-ignore
      res = (res + ((count[i - 1][`0${j}`] ?? 0) * (count2[i + 1][`0${j}`] ?? 0)) % M) % M

    for (let num = 10; num < 100; num++) {
      // @ts-ignore
      if (count[i - 1][num] > 0 && count2[i + 1][num] > 0) {
        set.add(num)
        set.add(Array.from(String(num)).reverse().join(''))

        // count[i-1][num]
        // count[n][Array.from(String(num)).reverse().join('')]
        // @ts-ignore
        res = (res + (count[i - 1][num] * count2[i + 1][num]) % M) % M
      }
    }
  }

  return res
}

// console.log(countPalindromes("95664210873507549084361027559308288038020451384423"))