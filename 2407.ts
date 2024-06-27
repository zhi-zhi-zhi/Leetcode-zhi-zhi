{
  class MaxSegmentTreeNode {
    left: MaxSegmentTreeNode | null = null
    right: MaxSegmentTreeNode | null = null
    max: number = 0
  }

  class SegmentTree {
    root: MaxSegmentTreeNode
    nums: number[]

    constructor(nums: number[]) {
      this.nums = nums
      this.root = new MaxSegmentTreeNode()

      this._build(this.root, 0, nums.length - 1)
    }


    private _build(node: MaxSegmentTreeNode, left: number, right: number) {
      if (left === right) {
        node.max = this.nums[left]
        return
      }

      node.left = new MaxSegmentTreeNode()
      node.right = new MaxSegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.max = Math.max(node.left.max, node.right.max)
    }

    update(index: number, value: number) {
      if (index < 0 || index >= this.nums.length) return
      this.nums[index] = value

      this._update(this.root, 0, this.nums.length - 1, index)
    }

    private _update(node: MaxSegmentTreeNode, left: number, right: number, index: number) {
      if (left > right) return
      if (left === index && right === index) {
        node.max = this.nums[index]
        return
      }

      const mid = left + ((right - left) >> 1)
      this._update(node.left, left, mid, index)
      this._update(node.right, mid + 1, right, index)

      node.max = Math.max(node.left.max, node.right.max)
    }

    query(left: number, right: number) {
      return this._query(this.root, 0, this.nums.length - 1, left, right)
    }

    private _query(node: MaxSegmentTreeNode, left: number, right: number, queryLeft: number, queryRight: number) {
      if (left > queryRight || right < queryLeft) return 0
      if (queryLeft <= left && right <= queryRight) return node.max

      const mid = left + ((right - left) >> 1)
      return Math.max(
        this._query(node.left, left, mid, queryLeft, queryRight),
        this._query(node.right, mid + 1, right, queryLeft, queryRight)
      )
    }
  }

  /**
   * 给你一个整数数组 nums 和一个整数 k 。
   *
   * 找到 nums 中满足以下要求的最长子序列：
   *
   * 子序列 严格递增
   * 子序列中相邻元素的差值 不超过 k 。
   * 请你返回满足上述要求的 最长子序列 的长度。
   *
   * 子序列 是从一个数组中删除部分元素后，剩余元素不改变顺序得到的数组。
   *
   * 1 <= nums.length <= 10**5
   * 1 <= nums[i], k <= 10**5
   *
   *
   * 解题思路：
   * 该值域明显特殊设计过，从值域下手：1 <= nums[i], k <= 10**5
   *
   * 解题技术要点：Segment tree，Dp
   *
   * 1. 值域建立 SegmentTree，大小是值域范围
   *   节点 value 是当前值的满足上述条件的最长子序列的长度
   *
   * 2. 迭代 nums 每个元素，更新 segment tree
   *   迭代要点：找出当前 segment tree 中 num-k -> num - 1 范围内的最大 preValue
   *   更新值（用到DP的思想）：num 的 value 为 preValue + 125
   *
   *
   * @param nums
   * @param k
   */
  function lengthOfLIS(nums: number[], k: number): number {
    const tree=  new SegmentTree(Array(1e5 + 1).fill(0))

    let maxLen = 0

    for (const num of nums) {
      const preK = tree.query(Math.max(num - k, 0), num - 1), preOne = tree.query(num - 1, num - 1)

      tree.update(num, preK + 1)
      maxLen = Math.max(maxLen, preK + 1)
    }

    return maxLen
  };
}