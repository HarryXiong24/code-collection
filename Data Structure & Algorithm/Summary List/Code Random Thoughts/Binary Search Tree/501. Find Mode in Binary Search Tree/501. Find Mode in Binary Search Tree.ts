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

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

export function findMode(root: TreeNode | null): number[] {
  const map: Map<number, number> = new Map();

  if (!root) {
    return [];
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    if (!map.has(node.val)) {
      map.set(node.val, 0);
    }
    map.set(node.val, map.get(node.val)! + 1);

    recursion(node.left);
    recursion(node.right);
  };

  recursion(root);

  const maxCount = Math.max(...map.values());

  return [...map.entries()].filter(([num, count]) => count === maxCount).map(([num, count]) => num);
}
