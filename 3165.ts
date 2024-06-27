class SegmentTreeNode {
  left: SegmentTreeNode | null = null
  right: SegmentTreeNode | null = null
  dp00: number = Number.MIN_SAFE_INTEGER
  dp11: number = Number.MIN_SAFE_INTEGER
  dp10: number = Number.MIN_SAFE_INTEGER
  dp01: number = Number.MIN_SAFE_INTEGER
}

class SegmentTree {
  nums: number[]
  root: SegmentTreeNode | null = null

  constructor(nums: number[]) {
    this.nums = nums
    this.root = this._build(0, nums.length - 1)
  }

  private _build(left: number, right: number): SegmentTreeNode | null {
    if (left > right) return null

    const node = new SegmentTreeNode()
    if (left === right) {
      node.dp11 = this.nums[left]
      node.dp00 = 0
      return node
    }

    const mid = left + ((right - left) >> 1)
    node.left = this._build(left, mid)
    node.right = this._build(mid + 1, right)
    this._updateNonLeafNode(node, left, right)
    return node
  }

  public update(index: number, value: number) {
    this.nums[index] = value
    this._update(this.root, 0, this.nums.length - 1, index)
  }

  private _update(node: SegmentTreeNode | null, left: number, right: number, index: number) {
    if (node === null) return
    if (left === right) {
      node.dp11 = this.nums[left]
      node.dp00 = 0
      return
    }

    const mid = left + ((right - left) >> 1)
    if (index <= mid) this._update(node.left, left, mid, index)
    else this._update(node.right, mid + 1, right, index)

    this._updateNonLeafNode(node, left, right)
  }

  private _updateNonLeafNode(node: SegmentTreeNode, left: number, right: number) {
    const mid = left + ((right - left) >> 1)

    if (node.left && node.right) {
      node.dp00 = Math.max(
        node.left.dp00 + node.right.dp00,
        node.left.dp01 + node.right.dp00,
        node.left.dp00 + node.right.dp10
      )
      node.dp01 = Math.max(
        node.left.dp00 + node.right.dp01,
        node.left.dp01 + node.right.dp01,
        node.left.dp00 + node.right.dp11
      )
      node.dp10 = Math.max(
        node.left.dp10 + node.right.dp00,
        node.left.dp10 + node.right.dp10,
        node.left.dp11 + node.right.dp00
      )
      node.dp11 = Math.max(
        node.left.dp10 + node.right.dp11,
        node.left.dp11 + node.right.dp01,
        node.left.dp10 + node.right.dp01
      )
    }
  }
}

function maximumSumSubsequence(nums: number[], queries: number[][]): number {
  const n = nums.length
  const segmentTree = new SegmentTree(nums)
  let res = 0

  for (const [pos, x] of queries) {
    segmentTree.update(pos, x)
    res = (res + Math.max(
        segmentTree.root.dp11,
        segmentTree.root.dp10,
        segmentTree.root.dp01,
        segmentTree.root.dp00,
      )) % (1e9 + 7)
  }

  return res
};
// class SegmentTree {
//   nums: number[]
//   // maxSegmentTree: number[]
//   // 递归思想
//   // 我们令dp00[i][j]表示[i:j]区间内的最大收益，并且要求左右端点都不取到。
//   // 同理，定义dp11[i][j]为区间[i:j]两个端点都取到时的最大收益，
//   // 定义dp10[i][j]为区间[i:j]仅左端点都取到时的最大收益，
//   // 定义dp01[i][j]为区间[i:j]仅右端点都取到时的最大收益。
//   //
//   dp00: number[][]
//   dp11: number[][]
//   dp10: number[][]
//   dp01: number[][]
//
//
//   constructor(nums: number[]) {
//     const n = nums.length
//     this.nums = nums
//     // this.maxSegmentTree = Array(nums.length * 4).fill(0)
//     this.dp00 = Array.from(Array(n), () => Array(n).fill(Number.MIN_SAFE_INTEGER))
//     this.dp11 = Array.from(Array(n), () => Array(n).fill(Number.MIN_SAFE_INTEGER))
//     this.dp10 = Array.from(Array(n), () => Array(n).fill(Number.MIN_SAFE_INTEGER))
//     this.dp01 = Array.from(Array(n), () => Array(n).fill(Number.MIN_SAFE_INTEGER))
//
//     this._build(0, 0, nums.length - 1)
//   }
//
//   private _build(root: number, left: number, right: number) {
//     if (left === right) {
//       // this.maxSegmentTree[root] = this.nums[left]
//       this.dp11[left][right] = this.nums[left]
//       this.dp00[left][right] = 0
//       return
//     }
//
//     const mid = left + ((right - left) >> 1)
//
//     this._build(root * 2 + 1, left, mid)
//     this._build(root * 2 + 2, mid + 1, right)
//
//     this._updateNonLeftNode(root, left, right)
//   }
//
//   public update(index: number, value: number) {
//     this.nums[index] = value
//     this._update(0, 0, this.nums.length - 1, index)
//   }
//
//   private _update(root: number, left: number, right: number, index: number) {
//     if (left === right) {
//       // this.maxSegmentTree[root] = this.nums[left]
//       this.dp11[left][right] = this.nums[left]
//       this.dp00[left][right] = 0
//       return
//     }
//
//     const mid = left + ((right - left) >> 1)
//
//     // use bisection to find the location
//     if (index <= mid) this._update(root * 2 + 1, left, mid, index)
//     else this._update(root * 2 + 2, mid + 1, right, index)
//
//     this._updateNonLeftNode(root, left, right)
//   }
//
//   private _updateNonLeftNode(root: number, left: number, right: number) {
//     const mid = left + ((right - left) >> 1)
//
//     // update max segment tree
//     // this.maxSegmentTree[root] = Math.max(
//     //   this.maxSegmentTree[root * 2 + 1],
//     //   this.maxSegmentTree[root * 2 + 2],
//     // )
//
//     this.dp00[left][right] = Math.max(
//       this.dp00[left][mid] + this.dp00[mid + 1][right],
//       this.dp01[left][mid] + this.dp00[mid + 1][right],
//       this.dp00[left][mid] + this.dp10[mid + 1][right],
//     )
//     this.dp01[left][right] = Math.max(
//       this.dp00[left][mid] + this.dp01[mid + 1][right],
//       this.dp01[left][mid] + this.dp01[mid + 1][right],
//       this.dp00[left][mid] + this.dp11[mid + 1][right],
//     )
//     this.dp10[left][right] = Math.max(
//       this.dp10[left][mid] + this.dp00[mid + 1][right],
//       this.dp10[left][mid] + this.dp10[mid + 1][right],
//       this.dp11[left][mid] + this.dp00[mid + 1][right],
//     )
//     this.dp11[left][right] = Math.max(
//       this.dp10[left][mid] + this.dp11[mid + 1][right],
//       this.dp11[left][mid] + this.dp01[mid + 1][right],
//       this.dp10[left][mid] + this.dp01[mid + 1][right],
//     )
//   }
// }
//
// function maximumSumSubsequence(nums: number[], queries: number[][]): number {
//   const n = nums.length
//   const segmentTree = new SegmentTree(nums)
//   let res = 0
//
//   for (const [pos, x] of queries) {
//     segmentTree.update(pos, x)
//     res = (res + Math.max(
//         segmentTree.dp11[0][n - 1],
//         segmentTree.dp10[0][n - 1],
//         segmentTree.dp01[0][n - 1],
//         segmentTree.dp00[0][n - 1],
//       )) % (1e9 + 7)
//   }
//
//   return res
// };
