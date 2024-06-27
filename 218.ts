{
  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    // the max number between [left, right]
    value: number = 0
    lazyTag: boolean = false
  }

  class SegmentTree {
    root: SegmentTreeNode
    nums: number[]

    constructor(nums: number[]) {
      this.nums = nums
      this.root = new SegmentTreeNode()

      this._build(this.root, 0, this.nums.length - 1)
    }

    private _build(node: SegmentTreeNode, left: number, right: number) {
      if (left > right) return
      if (left === right) {
        node.value = this.nums[left]
        return
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      // update node.value
      node.value = Math.max(node.left.value, node.right.value)
    }

    updateBatch(left: number, right: number, value: number) {
      this._updateBatch(this.root, left, right, value, 0, this.nums.length - 1)
    }

    private _updateBatch(node: SegmentTreeNode, updateLeft: number, updateRight: number, value: number, curLeft: number, curRight: number) {
      if (curRight < updateLeft || curLeft > updateRight) return
      if (updateLeft <= curLeft && curRight <= updateRight) {
        if (value >= node.value) {
          // 全区间更新为该值，可以区间更新，打个懒标记
          node.lazyTag = true
          node.value = value
          return
        } else {
          // node.value > value
          if (node.lazyTag === true) {
            // 当前整个区间的值都比 value 高，更新没有必要
            return
          } else {
            // 当前整个区间的值可能部分比 value 高，部分比 value 低，要考虑这件事情，更新比 value 低的区间
            const mid = curLeft + ((curRight - curLeft) >> 1)
            this._updateBatch(node.left, updateLeft, updateRight, value, curLeft, mid)
            this._updateBatch(node.right, updateLeft, updateRight, value, mid + 1, curRight)
            return
          }
        }
      }

      if (node === null) {
        console.log('stop')
      }

      // 部分覆盖的情况
      // 如果打了懒标记，得下发
      if (node.lazyTag) {
        node.lazyTag = false

        node.left.value = node.value
        node.left.lazyTag = true
        node.right.value = node.value
        node.right.lazyTag = true
      }

      const mid = curLeft + ((curRight - curLeft) >> 1)
      this._updateBatch(node.left, updateLeft, updateRight, value, curLeft, mid)
      this._updateBatch(node.right, updateLeft, updateRight, value, mid + 1, curRight)

      // update node.value
      node.value = Math.max(node.left.value, node.right.value)
    }

    queryMax(left: number, right: number): number {
      return this._queryMax(this.root, left, right, 0, this.nums.length - 1)
    }

    private _queryMax(node: SegmentTreeNode, queryLeft: number, queryRight: number, curLeft: number, curRight: number) {
      if (queryRight < curLeft || curRight < queryLeft) return 0
      if (queryLeft <= curLeft && curRight <= queryRight) return node.value

      // 部分覆盖的情况
      // 如果打了懒标记，得下发
      if (node.lazyTag) {
        node.lazyTag = false

        node.left.value = node.value
        node.left.lazyTag = true
        node.right.value = node.value
        node.right.lazyTag = true
      }

      const mid = curLeft + ((curRight - curLeft) >> 1)
      return Math.max(
        this._queryMax(node.left, queryLeft, queryRight, curLeft, mid),
        this._queryMax(node.right, queryLeft, queryRight, mid + 1, curRight)
      )
    }
  }

  /**
   * 解题思路：
   * 1. 数据离散化
   * 2. 线段树收集数据
   * 3. 遍历线段树所有叶子节点，找到所有值发生 变化 的点
   *
   *
   * 1 <= buildings.length <= 10**4
   * 0 <= left_i < right_i <= 2**31 - 1
   * 1 <= height_i <= 2**31 - 1
   * buildings is sorted by left_i in non-decreasing order.
   *
   * @param buildings
   */
  function getSkyline(buildings: number[][]): number[][] {
    // 1. 数据离散化
    const allNumSet = new Set(buildings.reduce(
      (arr, [left, right]) => {
        arr.push(left, right)
        return arr
      }
      , []))
    const allNumSorted = Array.from(allNumSet).sort((a, b) => a - b)
    const valueToIndex = new Map<number, number>()
    allNumSorted.map((num, index) => {
      valueToIndex.set(num, index)
    })

    // 2.1 建树
    const segmentTree = new SegmentTree(Array(allNumSorted.length).fill(0))

    // 2.2 更新树的信息
    for (const [l, r, v] of buildings) {
      const lx = valueToIndex.get(l)
      const rx = valueToIndex.get(r)

      segmentTree.updateBatch(lx, rx - 1, v)
    }

    // 3 获取变更点信息
    let preV = -1
    const res = []

    for (let i = 0; i < allNumSorted.length; i++) {
      const v = segmentTree.queryMax(i, i)
      if (preV !== v) {
        preV = v
        res.push([allNumSorted[i], v])
      }
    }

    return res
  }

  // console.log(getSkyline([[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]))
}