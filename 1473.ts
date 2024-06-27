console.log(
  minCost([0,2,1,2,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3)
)

console.log(
  minCost([2,3,0], [[5,2,3],[3,4,1],[1,2,1]], 3, 3, 3)
)

/**
 *
 * 1 <= m <= 100
 * 1 <= n <= 20
 * 1 <= target <= m
 * 0 <= houses[i] <= n
 * 1 <= cost[i][j] <= 10^4
 */
function minCost(houses: number[], cost: number[][], m: number, n: number, target: number): number {
  // 剪枝
  {
    let set = new Set(houses)
    set.delete(0)
    if (set.size > target) return -1
  }

  // dp[i][j][k]
  // 前 i 个房子，第 i 个房子涂第 j + 1 种 color，当前总共 k 中 neighbors
  // 的最小代价
  // dp[i][j][k]
  // 1. 本身就有颜色
  //   -. 和前一个房子颜色相同，from dp[i-1][j][k]
  //   -. 和前一个房子颜色不同，from dp[i-1][j diff than currentJ][k-1]
  // 2. 本身没有颜色
  //   -. 和前一个房子颜色相同，from dp[i-1][j][k] + cost[i][j]
  //   -. 和前一个房子颜色不同，from dp[i-1][j diff than currentJ][k-1] + cost[i][j]


  // 初始条件: dp[0][0][0] = 0
  const dp = Array.from(
    Array(m+1),
    () => Array.from(
      Array(n+1),
      () => Array(m+1).fill(1e9))
  )
  dp[0][0][0] = 0

  for (let i = 1; i <= m; i++) {
    const dpi_1 = Array.from(Array(target + 1), () => {
      return [] as ({
        color: undefined | number,
        cost: 1e9
      })[]
    })

    for (let k = 0; k <= target; k++) {
      for (let j = 0; j <= n; j++) {
        dpi_1[k].push({
          color: j,
          cost: dp[i-1][j][k]
        })
      }
    }
    for (let k = 0; k <= target; k++) {
      dpi_1[k].sort((a, b) => a.cost - b.cost)
    }
    // dpi_1.sort((a, b) => a.cost - b.cost)


    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= target; k++) {
        let currentMin = dp[i][j][k]

        // dp[i][j][k]
        if (houses[i-1] !== 0) {
          // 1. 本身就有颜色
          if (houses[i-1] !== j) break
          //   -. 和前一个房子颜色相同，from dp[i-1][j][k]
          currentMin = Math.min(currentMin, dp[i-1][j][k])
          //   -. 和前一个房子颜色不同，from dp[i-1][j diff than currentJ][k-1]
          currentMin = Math.min(currentMin,
          dpi_1[k-1][0].color === j
            ? dpi_1[k-1][1].cost
            :dpi_1[k-1][0].cost
            )
          // for (let anotherJ = 0; anotherJ <= n; anotherJ++) {
          //   if (anotherJ === j) continue
          //   // 实际上，dp[i-1] 的情况已经算过，应该可以提前预处理，避免此次循环
          //   // 可以简略为 dpi_1[k-1]
          //   currentMin = Math.min(currentMin, dp[i-1][anotherJ][k-1])
          // }
        } else {
          // 2. 本身没有颜色
          //   -. 和前一个房子颜色相同，from dp[i-1][j][k] + cost[i][j]
          currentMin = Math.min(currentMin, dp[i-1][j][k] + cost[i-1][j-1])
          //   -. 和前一个房子颜色不同，from dp[i-1][j diff than currentJ][k-1] + cost[i][j]
          currentMin = Math.min(currentMin,
            (dpi_1[k-1][0].color === j
              ? dpi_1[k-1][1].cost
              :dpi_1[k-1][0].cost
            ) + cost[i-1][j-1]
          )
          // for (let anotherJ = 0; anotherJ <= n; anotherJ++) {
          //   if (anotherJ === j) continue
          //   // 实际上，dp[i-1] 的情况已经算过，应该可以提前预处理，避免此次循环
          //   // 可以简略为 dpi_1[k-1]
          //   currentMin = Math.min(currentMin, dp[i-1][anotherJ][k-1] + cost[i-1][j-1])
          // }
        }

        dp[i][j][k] = currentMin
      }
    }
  }

  let res = 1e9
  for (let j = 1; j <= n; j++) {
    res = Math.min(res, dp[m][j][target])
  }

  return res === 1e9 ? -1 : res
};