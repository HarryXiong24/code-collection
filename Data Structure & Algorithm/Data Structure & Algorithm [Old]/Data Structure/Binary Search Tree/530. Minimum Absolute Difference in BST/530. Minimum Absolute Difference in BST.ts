// 530. Minimum Absolute Difference in BST

// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

// Example 1:
// Input: root = [4,2,6,1,3]
// Output: 1

// Example 2:
// Input: root = [1,0,48,null,null,12,49]
// Output: 1

//  Definition for a binary tree node.
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

export function getMinimumDifference(root: TreeNode | null): number {
  const result: number[] = [];

  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    recursion(node.left);
    result.push(node.val);
    recursion(node.right);
  };

  recursion(root);

  let res = Infinity;

  for (let i = 1; i < result.length; i++) {
    res = Math.min(res, result[i] - result[i - 1]);
  }

  return res;
}
