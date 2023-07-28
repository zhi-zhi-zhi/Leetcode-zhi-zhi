/**
 * A: 视作 0 点
 * @param target: 视为 B 点
 * @param m: 加满油的容量
 * @param gasStation: 加油站坐标，长度为n
 */
function minimumOilingCount(target: number, m: number, gasStation: number[]) {
  let res = 0
  // 用 hash set 存所有加油站的位置
  const gasStationSet = new Set<number>(gasStation)
  // 避免重复操作
  const memoSet = new Set<string>()

  // 假设初始时有油（不然跑不出去
  recur(0, m, 0)

  return res

  /**
   * 递归
   *
   * @param position: 当前位置
   * @param oil: 油箱还剩多少油
   * @param oilingCount: 已经加油次数
   */
  function recur(position: number, oil: number, oilingCount: number) {
    // 已经到达终点 B
    if (position >= target) {
      // 维护最小加油次数
      res = Math.min(res, oilingCount)
      return
    }

    // 当前 position oil oilingCount 已经计算过，剪枝
    if (memoSet.has(`${position}_${oil}_${oilingCount}`))
      return


    for (let i = 1; i <= oil; i++) {
      // 当前油能到哪些地方，不加油
      recur(position + i, oil - i, oilingCount)

      // 到了加油站，加油
      if (gasStationSet.has(position + i)) {
        // 油量加满到 m
        recur(position + i, m, oilingCount + 1)
      }
    }

    memoSet.add(`${position}_${oil}_${oilingCount}`)
  }
}