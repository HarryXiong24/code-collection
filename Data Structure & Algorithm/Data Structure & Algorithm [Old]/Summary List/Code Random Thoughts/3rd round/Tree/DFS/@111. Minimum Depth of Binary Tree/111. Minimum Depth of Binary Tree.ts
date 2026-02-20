// 111. Minimum Depth of Binary Tree

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

export function minDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode): number => {
    if (!node.left && !node.right) {
      return 1;
    }

    const left_height = node.left ? recursion(node.left) : Infinity;
    const right_height = node.right ? recursion(node.right) : Infinity;

    return Math.min(left_height, right_height) + 1;
  };

  return recursion(root);
}
