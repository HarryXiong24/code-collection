// 108. Convert Sorted Array to Binary Search Tree

// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

// Example 1:
// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:

// Example 2:
// Input: nums = [1,3]
// Output: [3,1]
// Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

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

  const recursive = (nums: number[]) => {
    if (!nums.length) {
      return null;
    }
    const centerIndex = Math.floor(nums.length / 2);
    return new TreeNode(
      nums[centerIndex],
      sortedArrayToBST(nums.slice(0, centerIndex)),
      sortedArrayToBST(nums.slice(centerIndex + 1))
    );
  };

  return recursive(nums);
}
