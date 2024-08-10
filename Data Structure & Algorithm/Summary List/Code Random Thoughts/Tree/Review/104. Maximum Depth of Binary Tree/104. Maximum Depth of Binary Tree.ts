// 104. Maximum Depth of Binary Tree

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

export function maxDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left_height = recursion(node.left);
    const right_height = recursion(node.right);

    return Math.max(left_height, right_height) + 1;
  };

  return recursion(root);
}
