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

// Bottom-Up
export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }

  const recursive = (node1: TreeNode | null, node2: TreeNode | null): boolean => {
    if (!node1 && !node2) {
      return true;
    }

    if (node1 && node2) {
      if (node1.val !== node2.val) {
        return false;
      }
      return recursive(node1.left, node2.right) && recursive(node1.right, node2.left);
    } else {
      // condition: !node1 || !node2
      return false;
    }
  };

  return recursive(root.left, root.right);
}
