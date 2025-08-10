// 108. Convert Sorted Array to Binary Search Tree

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

export function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (!nums.length) {
    return null;
  }

  const recursion = (nums: number[]) => {
    if (!nums.length) {
      return null;
    }

    const mid = Math.floor(nums.length / 2);
    const node = new TreeNode(nums[mid]);

    node.left = recursion(nums.slice(0, mid));
    node.right = recursion(nums.slice(mid + 1));

    return node;
  };

  return recursion(nums);
}
