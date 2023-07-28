function bestClosingTime(customers: string): number {
  // 统计每一时刻的代价

  const n = customers.length
  const dpIn = Array(n + 1).fill(0)
  const dpNotIn = Array(n + 1).fill(0)

  for (let i = 0; i < n; i++) {
    if (customers[i] === 'Y') {
      dpIn[i + 1] = dpIn[i] + 1
      dpNotIn[i + 1] = dpNotIn[i]
    } else {
      dpIn[i + 1] = dpIn[i]
      dpNotIn[i + 1] = dpNotIn[i] + 1
    }
  }

  let cost = Number.MAX_SAFE_INTEGER
  let res = 0
  for (let i = 0; i <= n; i++) {
    // 商店在第 j 小时关门表示在第 j 小时以及之后商店处于关门状态。
    if (dpNotIn[i] + (dpIn[n] - dpIn[i]) < cost ) {
      cost = dpNotIn[i] + (dpIn[n] - dpIn[i])
      res = i
    }
    // cost = Math.min(cost, dpNotIn[i] + (dpIn[n] - dpIn[i]))
  }

  return res
}

// bestClosingTime('YYNY')