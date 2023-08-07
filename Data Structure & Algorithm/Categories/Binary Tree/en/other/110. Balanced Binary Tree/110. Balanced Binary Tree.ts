// 110. Balanced Binary Tree

// Given a binary tree, determine if it is height-balanced

// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: true

// Example 2:
// Input: root = [1,2,2,3,3,null,null,4,4]
// Output: false

// Example 3:
// Input: root = []
// Output: true

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
export function isBalanced(root: TreeNode | null): boolean {
  let res = true;

  const recursive = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left_depth = recursive(node.left);
    const right_depth = recursive(node.right);

    if (Math.abs(left_depth - right_depth) > 1) {
      res = false;
    }

    return Math.max(left_depth, right_depth) + 1;
  };

  recursive(root);

  return res;
}
