function countDays(days: number, meetings: number[][]): number {
  meetings.sort((a, b) => {
    if (a[0] === b[0]) {
      return -(a[1] - b[1])
    } else {
      return a[0] - b[0]
    }
  })

  const merge = []

  for (const [left, right] of meetings) {
    if (merge.length === 0) {
      merge.push([left, right])
    } else {
      const [preL, preR] = merge.at(-1)

      if ((left - 1) <= preR) {
        merge.pop()
        merge.push([preL, Math.max(right, preR)])
      } else {
        merge.push([left, right])
      }
    }
  }

  let res = 0
  let pre = 1

  for (const [left, right] of merge) {
    res = res + (left - pre)
    pre = right+1
  }

  res += Math.max(days - pre, 0)

  return res
};