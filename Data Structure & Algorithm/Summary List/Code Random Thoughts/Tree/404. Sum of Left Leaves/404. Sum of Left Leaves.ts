// 404. Sum of Left Leaves

// Given the root of a binary tree, return the sum of all left leaves.

// A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 24
// Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.

// Example 2:
// Input: root = [1]
// Output: 0

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

export function sumOfLeftLeaves(root: TreeNode | null): number {
  let sum: number = 0;

  if (!root) {
    return sum;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    if (node.left) {
      // no child
      if (!node.left.left && !node.left.right) {
        sum += node.left.val;
      }
      recursion(node.left);
    }
    if (node.right) {
      recursion(node.right);
    }
  };

  recursion(root);

  return sum;
}
