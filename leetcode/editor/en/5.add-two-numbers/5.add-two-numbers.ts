/**
 * 二维数组
 * @param n
 * @param m
 * @param fillValue
 */
function twoDimensionArr<T>(n: number, m: number, fillValue: T): T[][] {
  return Array.from(Array(n), () => Array(m).fill(fillValue));
}

function maximumBobPoints(numArrows: number, aliceArrows: number[]): number[] {
  const dp = twoDimensionArr(12, numArrows + 1, -1)
  const map = new Map<string, number[]>()

  dfs(11, numArrows)


  return map.get(`11_${numArrows}`)

  function dfs(section: number, leftNumArr: number): number {
    if (section <= 0) {
      const pre = Array(aliceArrows.length).fill(0)
      pre[0] = leftNumArr
      map.set(`${section}_${leftNumArr}`, pre)
      return 0
    } else if (leftNumArr <= 0) {
      return 0
    } else if (dp[section][leftNumArr] !== -1) {
      return dp[section][leftNumArr]
    }
    const unique = `${section}_${leftNumArr}`

    // 得section分 或者不得 section 分
    // 1. 如果要得分，得付出一定代价，先判断能否负的起
    let r1 = -1
    const r2 = dfs(section - 1, leftNumArr)
    if (leftNumArr > aliceArrows[section]) {
      r1 = section + dfs(section - 1, leftNumArr - (aliceArrows[section] + 1))
      dp[section][leftNumArr] = Math.max(r1, r2)

      if (r1 >= r2) {
        let pre = map.get(`${section - 1}_${leftNumArr - (aliceArrows[section] + 1)}`) ?? Array(aliceArrows.length).fill(0)
        pre[section] = aliceArrows[section] + 1
        map.set(unique, [...pre])
      } else {
        let pre = map.get(`${section - 1}_${leftNumArr}`) ?? Array(aliceArrows.length).fill(0)
        pre[section] = 0
        map.set(unique, [...pre])
      }
    } else {
      dp[section][leftNumArr] = r2
      let pre: undefined | number[] = map.get(`${section - 1}_${leftNumArr}`) ?? Array(aliceArrows.length).fill(0)
      pre[section] = 0
      map.set(unique, [...pre])
    }

    return dp[section][leftNumArr]
  }
}

