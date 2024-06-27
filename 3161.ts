{
  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    // 是否放置障碍物
    val: number = 0
    // 内部最大空闲
    maxEmptyLen: number = 0
    // 范围内有障碍的最左位置，没有标记为 -1
    minL: number = -1
    // 范围内有障碍的最右位置，没有标记为 -1
    maxR: number = -1
  }

  class SegmentTree {
    root :SegmentTreeNode
    nums: number[]

    constructor(nums: number[]) {
      this.nums = nums
      this.root = new SegmentTreeNode()

      this._build(this.root, 0, this.nums.length - 1)
    }

    private _build(node: SegmentTreeNode, left: number, right: number) {
      if (left === right) {
        node.val = this.nums[left]
        // current index is flat, maxEmptyLen is (index + 1) - max((index - 1), 0)
        // node.maxEmptyLen = (left === 0 || left === this.nums.length - 1) ? 1 : 2
        node.maxEmptyLen = 1
        node.minL = -1
        node.maxR = -1
        return
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.minL = Math.min(node.left.minL, node.right.minL)
      node.maxR = Math.max(node.left.maxR, node.right.maxR)

      node.maxEmptyLen = Math.max(
        node.left.maxEmptyLen,
        node.right.maxEmptyLen,
        node.minL - left,
        right - (node.maxR === -1 ? left : node.maxR),
        (node.right.minL === -1 ? right: node.right.minL)
        - (node.left.maxR === -1 ? left : node.left.maxR)
      )
    }

    /**
     * set the index is unflat
     * @param index
     */
    update(index: number) {
      this.nums[index] = 1

      this._update(this.root, 0, this.nums.length - 1, index)
    }

    private _update(node: SegmentTreeNode, left: number, right: number, index: number) {
      if (index < left || index > right || index > right) return
      if (left === right) {
        node.val = this.nums[index]
        node.maxEmptyLen = 1
        node.minL = left
        node.maxR = right
        return
      }

      const mid = left + ((right - left) >> 1)
      if (index <= mid) this._update(node.left, left, mid, index)
      else this._update(node.right, mid + 1, right, index)

      // update node
      if (node.left.minL === -1 || node.right.minL === -1) node.minL = Math.max(node.left.minL, node.right.minL)
      else node.minL = Math.min(node.left.minL, node.right.minL)
      node.maxR = Math.max(node.left.maxR, node.right.maxR)

      node.maxEmptyLen = Math.max(
        node.left.maxEmptyLen,
        node.right.maxEmptyLen,
        node.minL - left,
        right - (node.maxR === -1 ? left : node.maxR),
        // 两个之间的空隙
        (node.right.minL === -1 ? right: node.right.minL)
        - (node.left.maxR === -1 ? left : node.left.maxR)
      )
    }

    /**
     * find the maxEmptyLen between [left, right]
     *
     * @param left
     * @param right
     */
    query(left: number, right: number) {
      const [maxLen, mL, mR] = this._query(this.root, 0, this.nums.length - 1, left, right)
      return maxLen
    }

    private _query(node: SegmentTreeNode, left: number, right: number, queryLeft: number, queryRight: number) {
      if (left > right || left > queryRight || right < queryLeft) return [0, -1, -1]
      if (queryLeft <= left && right <= queryRight) {
        return [node.maxEmptyLen, node.minL, node.maxR]
      }

      const mid = left + ((right - left) >> 1)
      const [lm, lml, lmr] = this._query(node.left, left, mid ,queryLeft, queryRight)
      const [rm, rml, rmr] = this._query(node.right, mid + 1, right ,queryLeft, queryRight)

      if (lm === 0) return [rm, rml, rmr]
      else if (rm === 0) return [lm, lml, lmr]
      else {
        // update node
        const mL = (lml === -1 || rml === - 1)
          ? Math.max(lml, rml)
          : Math.min(lml, rml)
        const mR = Math.max(lmr, rmr)

        const maxLen = Math.max(
          /**
           * node.left.maxEmptyLen,
           *         node.right.maxEmptyLen,
           *         node.minL - left,
           *         right - (node.maxR === -1 ? left : node.maxR),
           *         // 两个之间的空隙
           *         (node.right.minL === -1 ? right: node.right.minL)
           *         - (node.left.maxR === -1 ? left : node.left.maxR)
           */
          lm,
          rm,
          mL - Math.max(queryLeft, left),
          Math.min(queryRight, right) - (mR === -1 ? Math.max(queryLeft, left) : mR),
          (rml === -1 ? Math.min(queryRight, right): rml)
          - (lmr === -1 ? Math.max(queryLeft, left) : lmr)
        )

        return [maxLen, mL, mR]
      }
    }
  }

  /**
   * 1 <= x, sz <= min(5 * 10**4, 3 * queries.length)
   * @param queries
   */
  function getResults(queries: number[][]): boolean[] {
    // const segmentTree = new SegmentTree(Array(5 * 1e4 + 1).fill(0))
    const maxX = Math.max(
      ...queries.map(query => query[1])
    )
    const segmentTree = new SegmentTree(Array(maxX + 1).fill(0))
    const res = []

    for (const query of queries) {
      if (query[0] === 1) {
        segmentTree.update(query[1])
      } else {
        const maxSpare = segmentTree.query(0, query[1])
        console.log(maxSpare)
        res.push(maxSpare >= query[2])
      }
    }

    return res
  };

  console.log(getResults([[1,4],[2,1,2]]))
}