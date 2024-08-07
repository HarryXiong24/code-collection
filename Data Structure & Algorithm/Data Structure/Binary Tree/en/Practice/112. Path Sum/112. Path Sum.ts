// 112. Path Sum

// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

// A leaf is a node with no children.

// Example 1:
// Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true
// Explanation: The root-to-leaf path with the target sum is shown.

// Example 2:
// Input: root = [1,2,3], targetSum = 5
// Output: false
// Explanation: There two root-to-leaf paths in the tree:
// (1 --> 2): The sum is 3.
// (1 --> 3): The sum is 4.
// There is no root-to-leaf path with sum = 5.

// Example 3:
// Input: root = [], targetSum = 0
// Output: false
// Explanation: Since the tree is empty, there are no root-to-leaf paths.

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

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  let res = false;

  if (!root) {
    return false;
  }

  const recursion = (node: TreeNode, sum: number) => {
    if (!node.left && !node.right) {
      if (sum + node.val === targetSum) {
        res = true;
      }
      return;
    }

    node.left && recursion(node.left, sum + node.val);
    node.right && recursion(node.right, sum + node.val);
  };

  recursion(root, 0);

  return res;
}
