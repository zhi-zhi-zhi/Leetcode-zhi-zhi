{
  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    sum: number = 0
    range: number = 0
    lazy: boolean = false
  }

  class SegmentTree {
    root: SegmentTreeNode
    nums: number[]

    constructor(nums: number[]) {
      this.nums = nums
      this.root = new SegmentTreeNode()

      this._build(this.root, 0, nums.length - 1)
    }

    private _build(node: SegmentTreeNode, left: number, right: number) {
      if (left === right) {
        node.sum = this.nums[left]
        node.range = 1
        return
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.sum = node.left.sum + node.right.sum
      node.range = right - left + 1
    }

    updateRangeReverse(left: number, right: number) {
      this._updateRangeReverse(this.root, 0, this.nums.length - 1, left, right)
    }

    private _updateRangeReverse(node: SegmentTreeNode, left: number, right: number, updateLeft: number, updateRight: number) {
      if (left > updateRight || right < updateLeft || left > right) return
      if (updateLeft <= left && right <= updateRight) {
        node.lazy = !node.lazy
        node.sum = node.range - node.sum
        return
      }

      this._pushDown(node)

      const mid = left + ((right - left) >> 1)
      this._updateRangeReverse(node.left, left, mid, updateLeft, updateRight)
      this._updateRangeReverse(node.right, mid + 1, right, updateLeft, updateRight)

      node.sum = node.left.sum + node.right.sum
    }

    queryRange(left: number, right: number): number {
      return this._queryRange(this.root, 0, this.nums.length - 1, left, right)
    }

    private _queryRange(node: SegmentTreeNode, left: number, right: number, queryLeft: number, queryRight: number): number {
      if (left > queryRight || right < queryLeft || left > right) return 0
      if (queryLeft <= left && right <= queryRight) return node.sum


      this._pushDown(node)

      const mid = left + ((right - left) >> 1)

      return this._queryRange(node.left, left, mid, queryLeft, queryRight) +
        this._queryRange(node.right, mid + 1, right, queryLeft, queryRight)
    }

    private _pushDown(node: SegmentTreeNode) {
      if (!node.left || !node.right || !node.lazy) return

      node.lazy = false

      node.left.lazy = !node.lazy
      node.left.sum = node.left.range - node.left.sum

      node.right.lazy = !node.lazy
      node.right.sum = node.right.range - node.right.sum
    }
  }

  function handleQuery(nums1: number[], nums2: number[], queries: number[][]): number[] {
    const tree = new SegmentTree(nums1)
    const res = []
    let sum2 = nums2.reduce((sum, num) => sum + num, 0)

    for (const [op, l, r] of queries) {
      if (op === 1) {
        tree.updateRangeReverse(l, r)
      } else if (op === 2) {
        sum2 += tree.queryRange(0, nums1.length - 1) * l
      } else {
        res.push(sum2)
      }
    }

    return res
  };

  // find why code not run as we expect
  // expected: [109,109,197,197]
  // actually: [109,109,145,145]
  console.log(handleQuery(
    [0,1,0,0,0,0],

    [14,4,13,13,47,18],
    [[3,0,0],[1,4,4],[1,1,4],[1,3,4],[3,0,0],[2,5,0],[1,1,3],[2,16,0],[2,10,0],[3,0,0],[3,0,0],[2,6,0]]))
}