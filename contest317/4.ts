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
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

/**
 * 线段树类
 * @param {number[]} nums
 */
var SeqTree = function(nums) {
  this.nums = nums
  this.tree = new Array(4 * nums.length).fill(0)
  this.saveTree = []
  this.build(0, 0, nums.length - 1)
}

/**
 * 建树方法
 * @param {*} node 当前树节点
 * @param {*} start 当前树节点涵盖范围的起点
 * @param {*} end 当前树节点涵盖范围的终点
 * @return {void}
 */
SeqTree.prototype.build = function(node, start, end) {
  if (start === end) {
    this.tree[node] = this.nums[start]
    return
  }
  const mid = start + Math.floor((end - start) / 2)
  const leftNode = 2 * node + 1
  const rightNode = 2 * node + 2
  this.build(leftNode, start, mid)
  this.build(rightNode, mid + 1, end)
  this.tree[node] = Math.max(this.tree[leftNode], this.tree[rightNode])
}

/**
 * 对外使用的更新方法
 * @param {number} index 需要修改的节点下标
 * @param {number} val 需要修改的数值
 * @return {void}
 */
SeqTree.prototype.update = function(index, val) {
  this.change(0, 0, this.nums.length - 1, index, val)
}

/**
 * 更新树节点
 * @param {*} node 当前树节点
 * @param {*} start 涵盖范围的起点
 * @param {*} end 涵盖范围的终点
 * @param {*} idx 需要修改的节点下标
 * @param {*} val 需要修改的数值
 * @return {void}
 */
SeqTree.prototype.change = function(node, start, end, idx, val) {
  if (start === end) {
    this.tree[node] = val
  } else if (idx < start || end < idx) {
    return
  } else {
    const mid = start + Math.floor((end - start) / 2)
    const leftNode = 2 * node + 1
    const rightNode = 2 * node + 2
    if (start <= idx && idx <= mid) {
      this.change(leftNode, start, mid, idx, val)
    } else {
      this.change(rightNode, mid + 1, end, idx, val)
    }
    this.tree[node] = Math.max(this.tree[leftNode], this.tree[rightNode])
  }
}

/**
 * 对外使用的区间求和方法
 * @param {number} left 查询区间的左节点
 * @param {number} right 查询区间的右节点
 * @return {number} 返回区间和
 */
SeqTree.prototype.maxRange = function() {
  return this.query(0, 0, this.nums.length - 1, 0, this.nums.length - 1)
}

SeqTree.prototype.save = function() {
  this.saveTree = [...this.tree]
}


SeqTree.prototype.recover = function() {
  for (let i = 0; i < this.tree.length; i++)
    this.tree[i] = this.saveTree[i]
}

/**
 * 查询范围的最大值
 * @param {*} node 当前树节点
 * @param {*} start 涵盖范围的起点
 * @param {*} end 涵盖范围的终点
 * @param {*} l 查询区间的左节点
 * @param {*} r 查询区间的右节点
 * @return {number} 返回区间和
 */
SeqTree.prototype.query = function(node, start, end, l = start, r = end) {
  if (r < start || end < l) {
    return 0
  } else if (l <= start && end <= r) {
    return this.tree[node]
  } else {
    const mid = start + Math.floor((end - start) / 2)
    const leftNode = 2 * node + 1
    const rightNode = 2 * node + 2
    const leftMax = this.query(leftNode, start, mid, l, r)
    const rightMax = this.query(rightNode, mid + 1, end, l, r)
    return Math.max(leftMax, rightMax)
  }
}


function treeQueries(root: TreeNode | null, queries: number[]): number[] {
  let res: number[] = []
  const arr: number[] = []

  treeHeightDfs(root, 0)

  function treeHeightDfs(node: TreeNode | null, curHeight: number) {
    if (node === null)
      return
    arr[node.val - 1] = curHeight
    treeHeightDfs(node.left, curHeight + 1)
    treeHeightDfs(node.right, curHeight + 1)
  }

  const seqTree = new SeqTree(arr)
  seqTree.save()

  let preNode: null | TreeNode = null
  for (let i = 0; i < queries.length; i++) {
    // seqTree.recover()
    if (preNode)
      recoverTreeNode(preNode)
    const node = findNode(root, queries[i])
    // if (node)
    //   seqTree.update(node.val - 1, 0)
    removeTreeNode(node)
    preNode = node
    res.push(seqTree.maxRange())
  }

  function findNode(node: TreeNode | null, queryVal): TreeNode | null {
    if (node === null)
      return

    if (node.val === queryVal)
      return node
    return findNode(node.left, queryVal) ?? findNode(node.right, queryVal)
  }

  function removeTreeNode(node: TreeNode | null) {
    if (node === null)
      return
    seqTree.update(node.val - 1, 0)
    removeTreeNode(node.left)
    removeTreeNode(node.right)
  }
  function recoverTreeNode(node: TreeNode | null) {
    if (node === null)
      return
    seqTree.update(node.val - 1, arr[node.val - 1])
    recoverTreeNode(node.left)
    recoverTreeNode(node.right)
  }

  return res
}