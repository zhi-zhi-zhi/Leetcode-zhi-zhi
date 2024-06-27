{
  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    value: number = 0
    lazyTag: boolean = false
  }

  class SegmentTree {
    nums: number[]
    root: SegmentTreeNode

    constructor(nums: number[]) {
      this.nums = nums
      this.root = new SegmentTreeNode()

      this._build(this.root, 0, this.nums.length - 1)
    }

    private _build(node: SegmentTreeNode, left: number, right: number) {
      if (left > right) return
      if (left === right) {
        node.value = this.nums[left]
        return;
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.value = Math.max(node.left.value, node.right.value)
    }

    updateBatch(updateLeft: number, updateRight: number, value: number) {
      this._updateBatch(this.root, updateLeft, updateRight, value, 0, this.nums.length - 1)
    }

    private _updateBatch(node: SegmentTreeNode, updateLeft: number, updateRight: number, value: number, curLeft: number, curRight: number) {
      // 区间不重合
      if (updateLeft > curRight || updateRight < curLeft) return
      // 区间完全重合
      if (updateLeft <= curLeft && curRight <= updateRight) {
        node.value = value
        node.lazyTag = true
        return;
      }

      // 部分重合
      if (node.lazyTag) {
        // 处理懒标记情况，节点值下放
        node.lazyTag = false

        node.left.value = node.value
        node.left.lazyTag = true
        node.right.value = node.value
        node.right.lazyTag = true
      }

      const mid = curLeft + ((curRight - curLeft) >> 1)
      this._updateBatch(node.left, updateLeft, updateRight, value, curLeft, mid)
      this._updateBatch(node.right, updateLeft, updateRight, value, mid + 1, curRight)

      node.value = Math.max(node.left.value, node.right.value)
    }

    query(queryLeft: number, queryRight: number): number {
      return this._query(this.root, queryLeft, queryRight, 0, this.nums.length - 1)
    }

    private _query(node: SegmentTreeNode, queryLeft: number, queryRight: number, curLeft: number, curRight: number): number {
      // 区间不重合
      if (queryLeft > curRight || queryRight < curLeft) return 0
      // 区间完全重合
      if (queryLeft <= curLeft && curRight <= queryRight) {
        return node.value
      }

      // 部分重合
      if (node.lazyTag) {
        // 处理懒标记情况，节点值下放
        node.lazyTag = false

        node.left.value = node.value
        node.left.lazyTag = true
        node.right.value = node.value
        node.right.lazyTag = true
      }

      const mid = curLeft + ((curRight - curLeft) >> 1)
      return Math.max(
        this._query(node.left, queryLeft, queryRight, curLeft, mid),
        this._query(node.right, queryLeft, queryRight, mid + 1, curRight)
      )
    }
  }

  /**
   * 解题思路：
   * 1. 数据离散化
   * 2. 使用线段树存储各节点高度
   * 3. update 时，找出当前区域最大值 max，再把当前区域更新为 max + val
   * @param positions
   */
  function fallingSquares(positions: number[][]): number[] {
    // 1. 离散化
    const allNumsSet = new Set(
      positions.reduce((arr, [start, sideLength]) => {
        arr.push(start, start + sideLength - 1)
        return arr
      }, [])
    )
    const indexToNumberArr = Array.from(allNumsSet).sort((a, b) => a - b)
    const numToIndexMap = new Map<number, number>(
      indexToNumberArr.map((num, index) => {
        return [num, index]
      })
    )

    // 2. 建立线段树
    const segmentTree = new SegmentTree(Array(allNumsSet.size).fill(0))

    // 3. 更新线段树，并记录每次更新时的最大值
    const res = []

    for (const [start, sideLen] of positions) {
      const l = numToIndexMap.get(start), r = numToIndexMap.get(start + sideLen -1)

      // 找到区域最大值
      const curMax = segmentTree.query(l, r)
      // 更新最大值并记录
      segmentTree.updateBatch(l, r, curMax + sideLen)
      res.push(segmentTree.query(0, allNumsSet.size - 1))
    }

    return res
  };
}