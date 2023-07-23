class LazySegmentTree {
  tree: number[]
  lazyTag: number[]
  nums: number[]

  constructor(nums: number[]) {
    this.nums = nums
    this.tree = Array(nums.length * 4) .fill(0)
    this.lazyTag = Array(nums.length * 4) .fill(0)
    this._build(0, 0, this.nums.length - 1)
  }

  private _build(root: number, start: number, end: number) {
    if (start === end) {
      this.tree[root] = this.nums[start]
      return
    }

    const mid = start + ((end - start) >> 1)
    this._build(root * 2 + 1, start, mid)
    this._build(root * 2 + 1, mid + 1, end)
    this.tree[root] = Math.max(this.tree[root * 2 + 1], this.tree[root * 2 + 2])
  }

  updateRange(left: number, right: number, val: number) {
    this._updateRange(0, 0, this.nums.length - 1, left, right, val)
  }

  private _updateRange(root: number, start: number, end: number, left: number, right: number, val: number) {
    // [start, end] not covered by [left, right]
    if (right < start || end < left) return
    // [start, end] completely covered within [left, right]
    if (left <= start && end <= right) {
      this.tree[root] = val
      this.lazyTag[root] = 1
      return
    }

    // partially covered
    this._pushDown(root, start, end)

    const mid = start + ((end - start) >> 1)
    this._updateRange(root * 2 + 1, start, mid, left, right, val)
    this._updateRange(root * 2 + 2, mid + 1, end, left, right, val)
    this.tree[root] = Math.max(this.tree[root * 2 + 1], this.tree[root * 2 + 2])

    // should reach hear
  }

  private _pushDown(root: number, start: number, end: number) {
    if (this.lazyTag[root] === 0) return

    if (start < end) {
      this.tree[root * 2 + 1] = this.tree[root]
      this.lazyTag[root * 2 + 1] = 1
      this.tree[root * 2 + 2] = this.tree[root]
      this.lazyTag[root * 2 + 2] = 1
    }
    this.lazyTag[root] = 0
  }

  queryRange(left: number, right: number): number {
    return this._queryRange(0, 0, this.nums.length - 1, left, right)
  }

  private _queryRange(root: number, start: number, end: number, left: number, right: number): number {
    // [start, end] not covered by [left, right]
    if (right < start || end < left) return 0
    // [start, end] completely covered within [left, right]
    if (left <= start && end <= right) return this.tree[root]

    // partially covered
    this._pushDown(root, start, end)

    const mid = start + ((end - start) >> 1)
    return Math.max(this._queryRange(root * 2 + 1, start, mid, left, right),
      this._queryRange(root * 2 + 2, mid + 1, end, left, right))
  }

}

function fallingSquares(positions: number[][]): number[] {
  // 离散化
  // position.length <= 1000
  // 即最多有 2000 个点
  const set = new Set<number>()
  for (const [start, len] of positions) {
    set.add(start)
    set.add(start + len - 1)
  }

  let index = 0
  const indexToPointMap = new Map<number, number>()
  for (const point of Array.from(set).sort((a, b) => a - b)) {
    indexToPointMap.set(point, index)
    index++
  }

  const n = indexToPointMap.size

  const segTree = new LazySegmentTree(Array(n).fill(0))
  const res: number[] = []

  for (const [left, len] of positions) {
    const l = indexToPointMap.get(left)!, r = indexToPointMap.get(left + len - 1)!
    const curMax = segTree.queryRange(l, r)
    segTree.updateRange(l, r, len + curMax)
    res.push(segTree.queryRange(0, n - 1))
  }

  return res
};
//
// console.log(fallingSquares([[1,2],[2,3],[6,1]]));
// console.log(fallingSquares([[100,100],[200,100]]));
// console.log(fallingSquares([[9,7],[1,9],[3,1]]));
// console.log(fallingSquares([[7,2],[1,7],[9,5],[1,8],[3,4]]));
