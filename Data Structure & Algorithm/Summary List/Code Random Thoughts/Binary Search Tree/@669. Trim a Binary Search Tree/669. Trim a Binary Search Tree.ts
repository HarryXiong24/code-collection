// 669. Trim a Binary Search Tree

// Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.

// Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.

// Example 1:
// Input: root = [1,0,2], low = 1, high = 2
// Output: [1,null,2]

// Example 2:
// Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
// Output: [3,2,null,1]

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

export function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) {
    return null;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return null;
    }

    if (low > node.val) {
      return recursion(node.left);
    }
    if (high < node.val) {
      return recursion(node.right);
    }

    node.left = recursion(node.left);
    node.left = recursion(node.left);
    return root;
  };

  return root;
}
