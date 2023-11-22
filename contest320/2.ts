/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */


class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

function closestNodes(root: TreeNode | null, queries: number[]): number[][] {
  const res: number[][] = []
  const nums = []
  // tree 转化为数组
  dfs(root)

  // 数组 lower_bound

  for (const query of queries) {
    const temp = []

    if (nums[0] > query) {
      temp.push(-1)
    } else {
      const index = upperBound(nums, query)
      if (index === nums.length)
        temp.push(nums[nums.length - 1])
      else
        temp.push(nums[index - 1])
    }

    if (nums.at(-1) < query) {
      temp.push(-1)
    } else {
      const index = lowerBound(nums, query)
      temp.push(nums[index])
    }

    res.push(temp)
  }

  return res

  function dfs(node: TreeNode | null) {
    if (node === null)
      return
    dfs(node.left)
    nums.push(node.val)
    dfs(node.right)
  }
};

/**
 * 第一个 >= target 的下标
 * @param nums
 * @param target
 */
function lowerBound(nums: number[][], target: number): number {
  let left = 0, right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return left
}

/**
 * 第一个 > target 的下标
 * @param nums
 * @param target
 */
function upperBound(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] <= target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return left
}