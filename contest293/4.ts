class CountIntervals {
  arr: number[][]
  sum: number

  constructor() {
    this.arr = []
    this.sum = 0
  }

  add(left: number, right: number): void {
    // 每次 add 都要合并区间。// 怎么快速合并区间？// 怎么快速合并区间？// 怎么快速合并区间？
    // 二分找到最后一个arr[1] < left 的位置，记为 i
    // 二分找到第一个arr[0] > right 的位置，记为 j
    const { arr } = this

    // 1. 找 i 和 j
    let x = 0, y = arr.length - 1
    while (x <= y) {
      const mid = x + Math.trunc((y - x) / 2)

      if (arr[mid][1] < left)
        x = mid + 1
      else
        y = mid - 1
    }
    const i = y

    x = 0
    y = arr.length - 1
    while (x <= y) {
      const mid = x + Math.trunc((y - x) / 2)

      if (arr[mid][0] <= right)
        x = mid + 1
      else
        y = mid - 1
    }
    const j = y

    // 2. 维护 sum
    for (let m = i + 1; m <= j; m++) {
      this.sum -= (arr[m][1] - arr[m][0] + 1)
    }

    // 3. 合并区间，维护 sum
    if (i === j) {
      arr.splice(i + 1, 0, [left, right])
      this.sum += right - left + 1
    } else {
      let start = Math.min(arr[i + 1][0], left), end = Math.max(arr[j][1], right)
      arr.splice(i + 1, j - i, [start, end])
      this.sum += end - start + 1
    }
  }

  count(): number {
    return this.sum
  }
}