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
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

/**
 * 重点
 * 1. 求深度
 *
 *
 * @param {TreeNode | null} root
 * @param {number} start
 * @returns {number}
 */
function amountOfTime(root: TreeNode | null, start: number): number {
  let res = 0;

  recur(root)

  return res;


  function recur(root: TreeNode | null): [number, number] {
    if (root === null) {
      return [0, -1];
    }
    const [leftDepth, leftDist] = recur(root.left);
    const [rightDepth, rightDist] = recur(root.right);

    let dist = -1;
    if (leftDist !== -1) {
      dist = leftDist + 1;
      res = Math.max(res, rightDepth + dist);
    } else if (rightDist !== -1) {
      dist = rightDist + 1;
      res = Math.max(res, leftDepth + dist);
    } else if (root.val === start) {
      dist = 0;
      res = Math.max(res, leftDepth, rightDepth);
    }

    return [1 + Math.max(leftDepth, rightDepth), dist];
  }
}
