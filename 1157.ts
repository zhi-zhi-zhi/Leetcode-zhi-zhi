{
  class VoteNode {
    x = 0
    count = 0

    constructor(x: number = 0, count: number = 0) {
      this.x = x
      this.count = count
    }

    add(otherNode: VoteNode) {
      if (this.x === otherNode.x) this.count += otherNode.count
      else if (this.count >= otherNode.count) this.count -= otherNode.count
      else {
        this.x = otherNode.x
        this.count = otherNode.count - this.count
      }
    }
  }

  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    value: VoteNode = new VoteNode()
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
        node.value = new VoteNode(this.nums[left], 1)
        return
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.value.add(node.left.value)
      node.value.add(node.right.value)
    }

    query(queryLeft: number, queryRight: number) {
      const ansNode = new VoteNode()
      this._query(this.root, 0, this.nums.length - 1, queryLeft, queryRight, ansNode)
      return ansNode
    }

    private _query(node: SegmentTreeNode, left: number, right: number, queryLeft: number, queryRight: number, ansNode: VoteNode) {
      if (queryRight < left || right < queryLeft) return
      if (queryLeft <= left && right <= queryRight) {
        ansNode.add(node.value)
        return
      }

      const mid = left + ((right - left) >> 1)
      this._query(node.left, left, mid, queryLeft, queryRight, ansNode)
      this._query(node.right, mid + 1, right, queryLeft, queryRight, ansNode)
    }
  }

  /**
   * 1 <= arr.length <= 2 * 10**4
   * 1 <= arr[i] <= 2 * 10**4
   * 0 <= left <= right < arr.length
   * threshold <= right - left + 1
   * 2 * threshold > right - left + 1
   */
  class MajorityChecker {
    segmentTree: SegmentTree
    /**
     * key: number
     * value: the array of occurrence position of number
     */
    posMap: Map<number, number[]>
    constructor(arr: number[]) {
      // pre handle segment tree
      this.segmentTree = new SegmentTree(arr)

      // pre handle positionMap
      this.posMap = new Map()
      arr.forEach((num, index) => {
        const arr = this.posMap.get(num) ?? []
        arr.push(index)
        this.posMap.set(num, arr)
      })
    }

    query(left: number, right: number, threshold: number): number {
      // find the 'x'
      const xNode = this.segmentTree.query(left, right)

      // get the occurrence count of x between nums[left...right]
      const occurrenceCount = this.getOccurrenceCount(xNode.x, left, right)

      return occurrenceCount >= threshold ? xNode.x : -1
    }

    private getOccurrenceCount(num: number, left: number, right: number): number {
      const posArr = this.posMap.get(num) ?? []
      return this.upperBound(posArr, right) - this.lowerBound(posArr, left)
    }

    /**
     * 返回首个 >= target 的元素的下标
     * @param nums
     * @param target
     * @private
     */
    private lowerBound(nums: number[], target: number) {
      let left = 0, right = nums.length - 1

      while (left <= right) {
        const mid = left + ((right - left) >> 1)

        if (nums[mid] < target) left = mid + 1
        else right = mid - 1
      }

      return left
    }

    /**
     * 返回首个 > target 的元素的下标
     * @param nums
     * @param target
     * @private
     */
    private upperBound(nums: number[], target: number) {
      let left = 0, right = nums.length - 1

      while (left <= right) {
        const mid = left + ((right - left) >> 1)

        if (nums[mid] <= target) left = mid + 1
        else right = mid - 1
      }

      return left
    }
  }

  /**
   * Your MajorityChecker object will be instantiated and called as such:
   * var obj = new MajorityChecker(arr)
   * var param_1 = obj.query(left,right,threshold)
   */

  var obj1 = new MajorityChecker([1,1,2,2,1,1])
  var param_1 = obj1.query(2,3, 2)
}