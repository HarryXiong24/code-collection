// 700. Search in a Binary Search Tree

// You are given the root of a binary search tree (BST) and an integer val.

// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

// Example 1:
// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]

// Example 2:
// Input: root = [4,2,7,1,3], val = 5
// Output: []

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

export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  const recursive = (node: TreeNode | null): TreeNode | null => {
    if (node === null) {
      return null;
    }

    if (node.val === val) {
      return node;
    } else {
      return recursive(node.left) || recursive(node.right) || null;
    }
  };

  return recursive(root);
}
