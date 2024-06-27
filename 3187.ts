{
  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    value: number = 0
    peakCount: number = 0
  }

  class SegmentTree {
    root: SegmentTreeNode
    nums: number[]
    peakCount: number[]

    constructor(nums: number[]) {
      this.nums = nums
      this.peakCount = Array(nums.length).fill(0)
      this.root = new SegmentTreeNode()

      this._build(this.root, 0, nums.length - 1)
    }

    private _build(node: SegmentTreeNode, left: number, right: number) {
      if (left === right) {
        node.value = this.nums[left]
        this._updatePeakCount(left)
        node.peakCount = this.peakCount[left]

        return
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)

      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.peakCount = node.left.peakCount + node.right.peakCount
    }

    private _updatePeakCount(index: number) {
      this.peakCount[index] =
        0 < index && index < this.nums.length - 1
        && this.nums[index] > this.nums[index - 1]
        && this.nums[index] > this.nums[index + 1]
          ? 1
          : 0
    }

    update(index: number, value: number) {
      this.nums[index] = value

      this._update(this.root, 0, this.nums.length - 1, Math.max(index - 1, 0), Math.min(index + 1, this.nums.length - 1))
    }

    private _update(node: SegmentTreeNode, left: number, right: number, updateLeft: number, updateRight: number) {
      if (updateLeft > right || updateRight < left || left > right) return 0
      if (updateLeft <= left && right <= updateRight) {
        if (left === right) {
          node.value = this.nums[left]
          this._updatePeakCount(left)
          node.peakCount = this.peakCount[left]

          return
        }

        const mid = left + ((right - left) >> 1)

        this._update(node.left, left, mid, updateLeft, updateRight)
        this._update(node.right, mid + 1, right, updateLeft, updateRight)

        node.peakCount = node.left.peakCount + node.right.peakCount

        return
      }

      const mid = left + ((right - left) >> 1)

      this._update(node.left, left, mid, updateLeft, updateRight)
      this._update(node.right, mid + 1, right, updateLeft, updateRight)

      node.peakCount = node.left.peakCount + node.right.peakCount
    }


    query(left: number, right: number) {
      if (left > right) return 0
      return this._query(this.root, 0, this.nums.length - 1, left, right)
    }

    private _query(node: SegmentTreeNode, left: number, right: number, queryLeft: number, queryRight: number) {
      if (queryLeft > right || queryRight < left || left > right) return 0
      if (queryLeft <= left && right <= queryRight) {
        return node.peakCount
      }

      const mid = left + ((right - left) >> 1)

      return this._query(node.left, left, mid, queryLeft, queryRight) +
        this._query(node.right, mid + 1, right, queryLeft, queryRight)
    }
  }


  function countOfPeaks(nums: number[], queries: number[][]): number[] {
    const res = []
    const segmentTree = new SegmentTree(nums)

    for (const [type, x, y] of queries) {
      if (type === 1) res.push(segmentTree.query(x + 1, y - 1))
      else segmentTree.update(x, y)
    }

    return res
  };

}