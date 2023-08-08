// 111. Minimum Depth of Binary Tree

// Given a binary tree, find its minimum depth.
// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
// Note: A leaf is a node with no children.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 2

// Example 2:
// Input: root = [2,null,3,null,4,null,5,null,6]
// Output: 5

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
  const recursive = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }
    let left = 0;
    let right = 0;
    if (node.left) {
      left = recursive(node.left) + 1;
    }
    if (node.right) {
      right = recursive(node.right) + 1;
    }

    if (node.left && node.right) {
      return left < right ? left : right;
    } else if (node.right) {
      return right;
    } else if (node.left) {
      return left;
    } else {
      return 1;
    }
  };
  return recursive(root);
}
