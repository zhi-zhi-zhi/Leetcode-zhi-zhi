type CompareFunction = (a: any, b: any) => number

class Comparator {
  compare: CompareFunction

  /**
   * Constructor.
   * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   */
  constructor(compareFunction?: CompareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param {(string|number)} a
   * @param {(string|number)} b
   * @returns {number}
   */
  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  /**
   * Checks if two variables are equal.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal(a, b) {
    return this.compare(a, b) === 0
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThan(a: any, b: any): boolean {
    return this.compare(a, b) < 0
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a: any, b: any): boolean {
    return this.compare(a, b) > 0
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * Reverses the comparison order.
   */
  reverse() {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}

class BinaryTreeNode<T = any> {
  left: null | BinaryTreeNode<T>
  right: null | BinaryTreeNode<T>
  parent: null | BinaryTreeNode<T>
  value: T
  compareFunction: CompareFunction
  nodeValueComparator: Comparator
  nodeComparator: Comparator

  constructor(value: null | T = null, compareFunction?: CompareFunction) {
    this.left = null
    this.right = null
    this.parent = null
    this.value = value

    this.compareFunction = compareFunction
    this.nodeValueComparator = new Comparator(compareFunction)
    this.nodeComparator = new Comparator()
  }

  get leftHeight() {
    if (!this.left) return 0

    return this.left.height + 1
  }

  get rightHeight() {
    if (!this.right) return 0

    return this.right.height + 1
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight
  }

  /**
   * @param {*} value
   * @return {BinaryTreeNode}
   */
  setValue(value: T): BinaryTreeNode<T> {
    this.value = value

    return this
  }

  setLeft(node: BinaryTreeNode<T>) {
    if (this.left) {
      this.left.parent.removeChild(this.left)
    }

    this.left = node
    if (this.left) {
      if (this.left.parent) this.left.parent.removeChild(this.left)
      this.left.parent = this
    }

    return this
  }

  setRight(node: BinaryTreeNode<T>) {
    if (this.right) {
      this.removeChild(this.right)
    }

    this.right = node

    if (this.right) {
      if (this.right.parent) this.right.parent.removeChild(this.right)
      this.right.parent = this
    }

    return this
  }


  insert(value: T) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value

      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value)
      }

      const newNode = new BinaryTreeNode(value, this.compareFunction)
      this.setLeft(newNode)

      return newNode
    }


    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value)
      }

      const newNode = new BinaryTreeNode(value, this.compareFunction)
      this.setRight(newNode)

      return newNode
    }

    return this
  }

  find(value: T): null | BinaryTreeNode<T> {
    if (this.nodeValueComparator.equal(this.value, value)) return this

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) return this.left.find(value)
    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) return this.right.find(value)

    return null
  }

  contains(value: T) {
    return !!this.find(value)
  }

  findMin(): BinaryTreeNode<T> {
    if (!this.left) return this

    return this.left.findMin()
  }
  findMax(): BinaryTreeNode<T> {
    if (!this.right) return this

    return this.right.findMax()
  }

  removeChild(nodeToRemove: BinaryTreeNode<T>) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left.parent = null
      this.left = null
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right.parent = null
      this.right = null
      return true
    }

    return false
  }

  replaceChild(nodeToReplace: BinaryTreeNode<T>, replacementNode: BinaryTreeNode<T>) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.setLeft(replacementNode)
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.setRight(replacementNode)
      return true
    }

    return false
  }

  static copyNode(sourceNode: BinaryTreeNode, targetNode: BinaryTreeNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }

  remove(value: T) {
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree.')
    }

    const {parent} = nodeToRemove

    if (!nodeToRemove.leftHeight && !nodeToRemove.rightHeight) {
      // Node is a leaf and has no children
      if (parent) {
        // Node has a parent. Just remove the pointer to this node from the parent.
        parent.removeChild(nodeToRemove)
      } else {
        // Node has no parent. Just erase current node value.
        nodeToRemove.setValue(undefined)
      }
      nodeToRemove.parent = null
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Node isn't a leaf and has two children
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with the next biggest value.

      const nextBiggerNode = nodeToRemove.right.findMin()
      if (this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        // In case if next right value is the next bigger node, and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.setValue(nextBiggerNode.value)
        nodeToRemove.setRight(nodeToRemove.right.right)
      } else {
        this.remove(nextBiggerNode.value)
        nodeToRemove.setValue(nextBiggerNode.value)
      }
    } else {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.

      const childNode = nodeToRemove.left || nodeToRemove.right

      if (parent) parent.replaceChild(nodeToRemove, childNode)
      else BinaryTreeNode.copyNode(childNode, nodeToRemove)
    }
  }

  traverseInOrder(): T[] {
    let traverse: T[] = [];

    // Add left node.
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // Add root.
    traverse.push(this.value);

    // Add right node.
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString()
  }

  previousLowerNode(value: T): null | BinaryTreeNode<T> {
    if (this.nodeValueComparator.equal(this.value, null)) return null

    if (this.nodeValueComparator.equal(this.value, value) && this.left)
      return this.left.findMax()
    if (this.nodeValueComparator.greaterThan(this.value, value) && this.left)
      return this.left.previousLowerNode(value)
    if (this.nodeValueComparator.lessThan(this.value, value) && this.right)
      return this.right.previousLowerNode(value) ?? this

    return null
  }
  nextBiggerNode(value: T): null | BinaryTreeNode<T> {
    if (this.nodeValueComparator.equal(this.value, null)) return null

    if (this.nodeValueComparator.equal(this.value, value) && this.right)
      return this.right.findMin()
    if (this.nodeValueComparator.greaterThan(this.value, value) && this.left)
      return this.left.previousLowerNode(value) ?? this
    if (this.nodeValueComparator.lessThan(this.value, value) && this.right)
      return this.right.nextBiggerNode(value)

    return null
  }
}

export default class AVLTree<T> {
  root: BinaryTreeNode<T>
  nodeComparator: Comparator

  constructor(nodeValueCompareFunction?: CompareFunction) {
    this.root = new BinaryTreeNode<T>(null, nodeValueCompareFunction)
    this.nodeComparator = this.root.nodeComparator
  }

  balance(node: BinaryTreeNode<T>) {
    if (node.balanceFactor > 1) {
      // Left tree should be balance
      if (node.left.balanceFactor > 0) {
        // Left tree do right rotation
        this.caseLeftLeft(node)
      } else {
        // node.left.balanceFactor < 0
        // Left tree do left rotation and then current tree do right rotation.
        this.caseLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      if (node.right.balanceFactor < 0) {
        // Right tree do left rotation
        this.caseRightRight(node)
      } else {
        // node.right.balanceFactor > 0
        // Right tree first do right rotation and then Current tree do left rotation.
        this.caseRightLeft(node)
      }
    }
  }

  /**
   * Current tree do right rotation
   * @param node
   */
  caseLeftLeft(node: BinaryTreeNode<T>) {
    const leftNode = node.left
    node.setLeft(null)

    // handle node.parent with left node
    if (node.parent) {
      node.parent.replaceChild(node, leftNode)
    } else {
      // node has not a parent. that mean node is root.
      this.root = leftNode
    }

    // handle right node of left node
    if (leftNode.right) {
      node.setLeft(leftNode.right)
    }

    // handle node and left node
    leftNode.setRight(node)
  }

  /**
   * Current tree do left rotation
   * @param node
   */
  caseRightRight(node: BinaryTreeNode<T>) {
    const rightNode = node.right
    node.setRight(null)

    // handle node.parent with left node
    if (node.parent) {
      node.parent.replaceChild(node, rightNode)
    } else {
      // node has not a parent. that mean node is root.
      this.root = rightNode
    }

    // handle right node of left node
    if (rightNode.left) {
      node.setRight(rightNode.left)
    }

    // handle node and left node
    rightNode.setLeft(node)
  }

  caseLeftRight(node: BinaryTreeNode<T>) {
    this.caseRightRight(node.left)
    this.caseLeftLeft(node)
  }
  caseRightLeft(node: BinaryTreeNode<T>) {
    this.caseLeftLeft(node.right)
    this.caseRightRight(node)
  }

  insert(value: T) {
    this.root.insert(value)

    // Let's move up to the root and check balance factors along the way.
    let currentNode = this.root.find(value)
    while (currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }
  }

  remove(value: T) {
    const nodeParent = this.root.find(value)?.parent
    this.root.remove(value)

    let currentNode = nodeParent || this.root
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }

  toString() {
    return this.root.toString()
  }

  contains(value: T) {
    return this.root.contains(value)
  }
}