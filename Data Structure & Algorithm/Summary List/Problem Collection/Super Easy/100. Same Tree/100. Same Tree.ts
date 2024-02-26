// 100. Same Tree

// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// Example 1:
// Input: p = [1,2,3], q = [1,2,3]
// Output: true

// Example 2:
// Input: p = [1,2], q = [1,null,2]
// Output: false

// Example 3:
// Input: p = [1,2,1], q = [1,1,2]
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

// recursive
// Time Complexity: O(n)
// Space Complexity: O(1)
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  let res = true;
  const recursive = (node_p: TreeNode | null, node_q: TreeNode | null) => {
    if (node_p && node_q && node_p.val !== node_q.val) {
      res = false;
    }
    if (!node_p && !node_q) {
      return;
    }
    if (!node_p || !node_q) {
      res = false;
      return;
    }
    recursive(node_p.left, node_q.left);
    recursive(node_p.right, node_q.right);
  };
  recursive(p, q);
  return res;
}
