class SumSegmentTreeNode {
  left: SumSegmentTreeNode | null = null
  right: SumSegmentTreeNode | null = null
  value: number = 0
}

class SumSegmentTree {
  nums: number[]
  root: SumSegmentTreeNode

  constructor(nums: number[]) {
    this.nums = nums
    this.root = new SumSegmentTreeNode()
    this._build(this.root, 0, nums.length - 1)
  }

  private _build(node: SumSegmentTreeNode, left: number, right: number) {
    if (left === right) {
      node.value = this.nums[left]
      return
    }

    node.left = new SumSegmentTreeNode()
    node.right = new SumSegmentTreeNode()

    const mid = left + ((right - left) >> 1)
    this._build(node.left, left, mid)
    this._build(node.right, mid + 1, right)

    node.value = node.left.value + node.right.value
  }

  public update(index: number, value: number) {
    this.nums[index] = value
    this._update(this.root, index, 0, this.nums.length - 1)
  }

  private _update(node: SumSegmentTreeNode, index: number, left: number, right: number) {
    if (left === right) {
      node.value = this.nums[left]
      return
    }

    const mid = left + ((right - left) >> 1)
    if (index <= mid) this._update(node.left, index, left, mid)
    else this._update(node.right, index, mid + 1, right)

    node.value = node.left.value + node.right.value
  }

  public sumRange(left: number, right: number): number {
    return this._sumRange(this.root, 0, this.nums.length - 1, left, right)
  }

  private _sumRange(node: SumSegmentTreeNode, curLeft: number, curRight: number, queryLeft: number, queryRight: number): number {
    if (queryLeft > curRight || queryRight < curLeft) return 0
    if (queryLeft <= curLeft && curRight <= queryRight) return node.value

    const mid = curLeft + ((curRight - curLeft) >> 1)

    return this._sumRange(node.left, curLeft, mid, queryLeft, Math.min(queryRight, mid))
      + this._sumRange(node.right, mid + 1, curRight, Math.max(queryLeft, mid + 1), queryRight)
  }
}

class NumArray {
  segmentTree: SumSegmentTree

  constructor(nums: number[]) {
    this.segmentTree = new SumSegmentTree(nums)
  }

  update(index: number, val: number): void {
    this.segmentTree.update(index, val)
  }

  sumRange(left: number, right: number): number {
    return this.segmentTree.sumRange(left, right)
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
