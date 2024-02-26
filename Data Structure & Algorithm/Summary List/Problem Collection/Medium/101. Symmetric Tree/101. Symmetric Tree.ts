// 101. Symmetric Tree

// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

// Example 1:
// Input: root = [1,2,2,3,4,4,3]
// Output: true

// Example 2:
// Input: root = [1,2,2,null,3,null,3]
// Output: false

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

// Recursion
// Time Complexity: O(n)
// Space Complexity: O(n)
export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }

  const recursion = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (!left && !right) {
      return true;
    }

    if (left && right) {
      if (left.val !== right.val) {
        return false;
      }
      return recursion(left.left, right.right) && recursion(left.right, right.left);
    } else {
      return false;
    }
  };

  return recursion(root.left, root.right);
}
