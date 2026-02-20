// 104. Maximum Depth of Binary Tree

// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:
// Input: root = [1,null,2]
// Output: 2

// Constraints:
// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

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

export function maxDepth(root: TreeNode | null): number {
  const queue: TreeNode[] = [];
  let height = 0;

  if (!root) {
    return height;
  }
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;

      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    height++;
  }

  return height;
}

export function maxDepth2(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left_node = recursion(node.left);
    const right_node = recursion(node.right);

    return Math.max(left_node, right_node) + 1;
  };

  return recursion(root);
}
