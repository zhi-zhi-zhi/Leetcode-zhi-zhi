function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * circulation
 */
function circulationVersion(root, k) {
  if (root === null) {
    return;
  }

  let stack = [];
  let p = root;

  while (stack.length !== 0 || p !== null) {
    while (p !== null) {
      stack.push(p);
      p = p.right;
    }

    p = stack.pop();
    if (--k === 0) {
      return p.val;
    }
    p = p.left;
  }

  return 0;
}

root = new TreeNode(5);
root.left = new TreeNode(3);
root.left.left = new TreeNode(2);
root.left.left.left = new TreeNode(1);
root.left.right = new TreeNode(4);

root.right = new TreeNode(6);


circulationVersion(root, 3);
