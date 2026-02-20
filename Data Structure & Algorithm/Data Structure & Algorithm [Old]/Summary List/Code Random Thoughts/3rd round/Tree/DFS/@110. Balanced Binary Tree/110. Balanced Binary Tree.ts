// 110. Balanced Binary Tree

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

export function isBalanced(root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }

  let res = true;

  const recursion = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left = recursion(node.left);
    const right = recursion(node.right);

    if (Math.abs(left - right) > 1) {
      res = false;
    }

    return Math.max(left, right) + 1;
  };

  recursion(root);

  return res;
}
