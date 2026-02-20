// 501. Find Mode in Binary Search Tree

// Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

// If the tree has more than one mode, return them in any order.

// Assume a BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than or equal to the node's key.
// The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
// Both the left and right subtrees must also be binary search trees.

// Example 1:
// Input: root = [1,null,2,2]
// Output: [2]

// Example 2:
// Input: root = [0]
// Output: [0]

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

export function findMode(root: TreeNode | null): number[] {
  let result: number[] = [];
  let maxCount = 0;
  let count = 0;
  let pre: TreeNode | null = null;

  if (!root) {
    return result;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    recursion(node.left);

    if (!pre) {
      count = 1;
    } else if (pre.val === node.val) {
      count++;
    } else {
      count = 1;
    }

    pre = node;

    if (count === maxCount) {
      result.push(node.val);
    }

    if (count > maxCount) {
      maxCount = count;
      result = [];
      result.push(node.val);
    }

    recursion(node.right);
  };

  recursion(root);

  return result;
}
