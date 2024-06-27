{
  function minNumberOperations(target: number[]): number {
    return minNumberOperationsSegmentTree(target)
  };


// Greedy: Math ituition
  function minNumberOperationsMath(target: number[]): number {
    return target.reduce((sum, num, index) => {
      if (index === 0) return num

      return sum + Math.max(target[index] - target[index - 1], 0)
    }, 0)
  };

  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    minValue: number = 0
    minValueIndex: number = 0
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
      if (left === right) {
        node.minValue = this.nums[left]
        node.minValueIndex = left
        return
      }

      const mid = left + ((right - left) >> 1)
      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      // calculate

      if (node.left.minValue <= node.right.minValue) {
        node.minValue = node.left.minValue
        node.minValueIndex = node.left.minValueIndex
      } else {
        node.minValue = node.right.minValue
        node.minValueIndex = node.right.minValueIndex
      }
    }

    queryPartitionMinIndex(left: number, right: number): [number, number] {
      return this._queryPartitionMin(this.root, left, right, 0, this.nums.length - 1)
    }

    private _queryPartitionMin(node: SegmentTreeNode, queryLeft: number, queryRight: number, curLeft: number, curRight: number): [number, number] {
      if (queryLeft > curRight || queryRight < curLeft) return [Number.MAX_SAFE_INTEGER, -1]
      if (queryLeft <= curLeft && curRight <= queryRight) return [node.minValue, node.minValueIndex]

      const mid = curLeft + ((curRight - curLeft) >> 1)
      const [leftMinValue, leftMinIndex] = this._queryPartitionMin(node.left, queryLeft, queryRight, curLeft, mid)
      const [rightMinValue, rightMinIndex] = this._queryPartitionMin(node.right, queryLeft, queryRight, mid + 1, curRight)

      return leftMinValue <= rightMinValue
        ? [leftMinValue, leftMinIndex]
        : [rightMinValue, rightMinIndex]
    }
  }

// SegmentTree
  function minNumberOperationsSegmentTree(target: number[]): number {
    const segTree = new SegmentTree(target)

    return dfs(0, target.length - 1)

    function dfs(left: number, right: number): number {
      if (left > right) return 0

      const [minIndexValue, minIndex] = segTree.queryPartitionMinIndex(left, right)

      return minIndexValue
        + Math.max(dfs(left, minIndex - 1) - minIndexValue, 0)
        + Math.max(dfs(minIndex + 1, right) - minIndexValue, 0)
    }
  };

  console.log(minNumberOperations([1, 2, 3, 2, 1]))
}