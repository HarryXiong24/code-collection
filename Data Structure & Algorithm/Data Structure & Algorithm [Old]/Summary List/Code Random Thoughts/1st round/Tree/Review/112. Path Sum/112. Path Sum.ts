// 112. Path Sum

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

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) {
    return false;
  }

  const recursion = (node: TreeNode, sum: number): boolean => {
    if (!node.left && !node.right) {
      if (sum + node.val === targetSum) {
        return true;
      }
      return false;
    }
    const left = (node.left && recursion(node.left, sum + node.val)) || false;
    const right = (node.right && recursion(node.right, sum + node.val)) || false;
    return left || right;
  };

  return recursion(root, 0);
}
