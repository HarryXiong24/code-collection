// 270. Closest Binary Search Tree Value

// Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.

// Example 1:
// Input: root = [4,2,5,1,3], target = 3.714286
// Output: 4

// Example 2:
// Input: root = [1], target = 4.428571
// Output: 1

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

function closestValue(root: TreeNode | null, target: number): number {
  if (!root) {
    return 0;
  }

  let result = Infinity;
  let gap = result;

  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    }
    if (Math.abs(node.val - target) < gap) {
      gap = Math.abs(node.val - target);
      result = node.val;
    }
    // If there are multiple answers, print the smallest.
    if (Math.abs(node.val - target) === gap) {
      result = Math.min(result, node.val);
    }
    // Binary Search
    if (target < node.val) {
      recursive(node.left);
    } else if (target > node.val) {
      recursive(node.right);
    } else {
      result = node.val;
    }
  };

  recursive(root);

  return result;
}
