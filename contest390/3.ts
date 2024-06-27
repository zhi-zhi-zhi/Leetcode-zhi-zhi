class SumAndMaxSegmentTree {
  nums: number[]
  sumTree: number[]
  maxTree: number[]

  constructor(nums: number[]) {
    this.nums = nums
    this.sumTree = Array(nums.length * 4).fill(0)
    this.maxTree = Array(nums.length * 4).fill(0)
    this._build(0, 0, nums.length - 1)
  }

  private _build(root: number, start: number, end: number) {
    if (start === end) {
      this.sumTree[root] = this.nums[start]
      this.maxTree[root] = this.nums[start]
      return
    }

    const mid = start + ((end - start) >> 1)

    this._build(root * 2 + 1, start, mid)
    this._build(root * 2 + 2, mid + 1, end)
    this.sumTree[root] = this.sumTree[root * 2 + 1] + this.sumTree[root * 2 + 2]
    this.maxTree[root] = Math.max(this.maxTree[root * 2 + 1], this.maxTree[root * 2 + 2])
  }

  update(index: number, value: number) {
    this.nums[index] = value
    this._update(0, 0, this.nums.length - 1, index)
  }

  private _update(root: number, start: number, end: number, index: number) {
    if (start === end) {
      this.sumTree[root] = this.nums[index]
      this.maxTree[root] = this.nums[index]
      return
    }

    const mid = start + ((end - start) >> 1)
    if (index <= mid) this._update(root * 2 + 1, start, mid, index)
    else this._update(root * 2 + 2, mid + 1, end, index)
    this.sumTree[root] = this.sumTree[root * 2 + 1] + this.sumTree[root * 2 + 2]
    this.maxTree[root] = Math.max(this.maxTree[root * 2 + 1], this.maxTree[root * 2 + 2])
  }

  querySum(left: number, right: number): number {
    return this._querySum(0, 0, this.nums.length - 1, left, right)
  }

  private _querySum(root: number, start: number, end: number, left: number, right: number): number {
    if (start === left && end === right) return this.sumTree[root]

    const mid = start + ((end - start) >> 1)

    if (right <= mid) return this._querySum(root * 2 + 1, start, mid, left, right)
    else if (left > mid) return this._querySum(root * 2 + 2, mid + 1, end, left, right)

    const leftSum = this._querySum(root * 2 + 1, start, mid, left, mid)
    const rightSum = this._querySum(root * 2 + 2, mid + 1, end, mid + 1, right)

    return leftSum + rightSum
  }

  queryMax(left: number, right: number): number {
    return this._queryMax(0, 0, this.nums.length - 1, left, right)
  }

  private _queryMax(root: number, start: number, end: number, left: number, right: number): number {
    if (start === left && end === right) return this.maxTree[root]

    const mid = start + ((end - start) >> 1)

    if (right <= mid) return this._queryMax(root * 2 + 1, start, mid, left, right)
    else if (left > mid) return this._queryMax(root * 2 + 2, mid + 1, end, left, right)

    const leftSum = this._queryMax(root * 2 + 1, start, mid, left, mid)
    const rightSum = this._queryMax(root * 2 + 2, mid + 1, end, mid + 1, right)

    return Math.max(leftSum, rightSum)
  }

  queryFirstGreater(left: number, right: number, value: number): [number, number] {
    if (this.maxTree[0] < value) return [-1, -1]
    return this._queryFirstGreater(0, 0, this.nums.length - 1, value)
  }

  private _queryFirstGreater(root: number, start: number, end: number, value: number): [number, number] {
    if (start === end) {
      return [start, this.maxTree[root]]
    }

    const mid = start + ((end - start) >> 1)

    if (this.maxTree[root * 2 + 1] >= value) return this._queryFirstGreater(root * 2 + 1, start, mid, value)
    else return this._queryFirstGreater(root * 2 + 2, mid + 1, end, value)
  }
}


function mostFrequentIDs(nums: number[], freq: number[]): number[] {
  const segTree = new SumAndMaxSegmentTree(Array(1e5+1).fill(0))
  const n = nums.length
  const res = Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    segTree.update(nums[i], segTree.nums[nums[i]] + freq[i])
    res[i] = segTree.queryMax(0, 1e5)
  }

  return res
};
