// 654. Maximum Binary Tree

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

export function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  if (!nums.length) {
    return null;
  }

  const recursion = (nums: number[]): TreeNode | null => {
    if (!nums.length) {
      return null;
    }

    const max = Math.max(...nums);
    const index = nums.indexOf(max);

    const node = new TreeNode(max);
    node.left = recursion(nums.slice(0, index));
    node.right = recursion(nums.slice(index + 1));

    return node;
  };

  return recursion(nums);
}
