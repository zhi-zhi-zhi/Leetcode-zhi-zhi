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

function reverseOddLevels(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;

  const queue: TreeNode[] = [root];
  const pre: TreeNode[] = [];
  let isOdd = false

  while (queue.length > 0) {
    if (pre.length) {
      if (isOdd) {
        let i = 0, j = queue.length - 1

        while (i < pre.length) {
          pre[i].left = queue[j--]
          pre[i].right = queue[j--]

          i++
        }
      } else {
        const n = queue.length;
        for (let i = 0; i < pre.length; i++) {
          pre[i].left = queue[n - 2 * (i + 1)];
          pre[i].right = queue[n - 2 * (i + 1) + 1];
        }
      }
    }

    const next = [];

    for (const node of queue) {
      if (node.left)
        next.push(node.left);
      if (node.right)
        next.push(node.right);
    }

    isOdd = !isOdd
    pre.splice(0, pre.length, ...queue);
    queue.splice(0, queue.length, ...next);
  }

  return root;
}


const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
node1.left = node2;
node1.right = node3;
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
const node6 = new TreeNode(6);
const node7 = new TreeNode(7);
node2.left = node4
node2.right = node5
node3.left = node6
node3.right = node7

reverseOddLevels(node1)
