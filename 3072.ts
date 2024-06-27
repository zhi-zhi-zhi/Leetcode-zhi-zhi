{
  class SegmentTreeNode {
    left: SegmentTreeNode | null = null
    right: SegmentTreeNode | null = null
    sum: number = 0
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
        return
      }

      node.left = new SegmentTreeNode()
      node.right = new SegmentTreeNode()

      const mid = left + ((right - left) >> 1)
      this._build(node.left, left, mid)
      this._build(node.right, mid + 1, right)

      node.sum = node.left.sum + node.right.sum
    }

    update(index: number, value: number) {
      this.nums[index] = value

      this._update(this.root, 0, this.nums.length - 1, index)
    }

    private _update(node: SegmentTreeNode, left: number, right: number, index: number) {
      if (left > right || index < left || index > right) return
      if (left === index && index === right) {
        node.sum = this.nums[left]
        return;
      }


      const mid = left + ((right - left) >> 1)
      this._update(node.left, left, mid, index)
      this._update(node.right, mid + 1, right, index)

      node.sum = node.left.sum + node.right.sum
    }

    query(left: number, right: number) {
      return this._query(this.root, 0, this.nums.length - 1, left, right)
    }

    private _query(node: SegmentTreeNode, left: number, right: number, queryLeft: number, queryRight: number) {
      if (left > right || left > queryRight || right < queryLeft) return 0
      if (queryLeft <= left && right <= queryRight) return node.sum

      const mid = left + ((right - left) >> 1)

      return this._query(node.left, left, mid, queryLeft, queryRight)
        + this._query(node.right, mid + 1, right, queryLeft, queryRight)
    }
  }


  /**
   * 给你一个下标从 1 开始、长度为 n 的整数数组 nums 。
   *
   * 现定义函数 greaterCount ，使得 greaterCount(arr, val) 返回数组 arr 中 严格大于 val 的元素数量。
   *
   * 你需要使用 n 次操作，将 nums 的所有元素分配到两个数组 arr1 和 arr2 中。
   * 在第一次操作中，将 nums[1] 追加到 arr1 。
   * 在第二次操作中，将 nums[2] 追加到 arr2 。之后，在第 i 次操作中：
   * 如果 greaterCount(arr1, nums[i]) > greaterCount(arr2, nums[i]) ，将 nums[i] 追加到 arr1 。
   * 如果 greaterCount(arr1, nums[i]) < greaterCount(arr2, nums[i]) ，将 nums[i] 追加到 arr2 。
   * 如果 greaterCount(arr1, nums[i]) == greaterCount(arr2, nums[i]) ，将 nums[i] 追加到元素数量较少的数组中。
   * 如果仍然相等，那么将 nums[i] 追加到 arr1 。
   *
   * 3 <= n <= 10**5
   * 1 <= nums[i] <= 10**9
   *
   *
   * 解题思路：
   * 1. 数据离散化
   * 2. 建立两颗 segment tree
   *   query(index)，返回 所有大于该 index 的总数
   *   update(index,value)，将index的值更新为value
   *   node value：当前范围下所有index value 的总和
   *   value：index 出现的个数
   *
   * @param nums
   */
  function resultArray(nums: number[]): number[] {
    const res1 = [], res2 = []

    // 1. 离散化
    const allNumsSorted =
      Array.from(new Set(nums))
      .sort((a, b) => a - b)
    const numsCount = allNumsSorted.length
    const valueToIndexMap = new Map(
      allNumsSorted.map((value, index) => [value, index])
    )

    // 2. 建树
    const segTree1 = new SegmentTree(Array(numsCount).fill(0))
    const segTree2 = new SegmentTree(Array(numsCount).fill(0))

    // 3. 初始化
    res1.push(nums[0])
    segTree1.update(valueToIndexMap.get(nums[0]), 1)
    res2.push(nums[1])
    segTree2.update(valueToIndexMap.get(nums[1]), 1)


    for (let i = 2; i < nums.length; i++) {
      const index = valueToIndexMap.get(nums[i])

      const x = segTree1.query(index + 1, numsCount - 1)
      const y = segTree2.query(index + 1, numsCount - 1)

      if (x > y) {
        // [44,96,91,32,94,81,51,91,8,41]
        // [44,96,91,32,8,94,81,51,91,41]
        res1.push(nums[i])
        segTree1.update(index, segTree1.nums[index] + 1)
      } else if (x < y) {
        res2.push(nums[i])
        segTree2.update(index, segTree2.nums[index] + 1)
      } else {
        if (res1.length <= res2.length) {
          res1.push(nums[i])
          segTree1.update(index, segTree1.nums[index] + 1)
        } else {
          res2.push(nums[i])
          segTree2.update(index, segTree2.nums[index] + 1)
        }
      }
    }


    return res1.concat(res2)
  };

  console.log(resultArray([44,94,96,81,91,51,32,91,8,41]))
}