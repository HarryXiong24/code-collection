// 669. Trim a Binary Search Tree

// Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) {
    return null;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return null;
    }

    if (node.val < low) {
      return recursion(node.right);
    }

    if (node.val > high) {
      return recursion(node.left);
    }

    node.left = recursion(node.left);
    node.right = recursion(node.right);

    return node;
  };

  return recursion(root);
}
