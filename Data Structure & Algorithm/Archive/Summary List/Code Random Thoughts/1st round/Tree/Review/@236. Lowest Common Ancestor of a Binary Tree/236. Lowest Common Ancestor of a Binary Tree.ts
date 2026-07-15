// 236. Lowest Common Ancestor of a Binary Tree

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

export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  const recursion = (node: TreeNode | null): TreeNode | null => {
    if (!node) {
      return null;
    }

    if (node === p || node === q) {
      return node;
    }

    const left = recursion(node.left);
    const right = recursion(node.right);

    if (left && right) {
      return node;
    } else if (left && !right) {
      return left;
    } else if (!left && right) {
      return right;
    } else {
      return null;
    }
  };

  return recursion(root);
}
