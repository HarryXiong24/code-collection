// 104. Maximum Depth of Binary Tree

// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:
// Input: root = [1,null,2]
// Output: 2

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

// DFS Recursion
// Time Complexity: O(n)
// Space Complexity: O(n), n is the height of the tree
export function maxDepth_Recursion(root: TreeNode | null): number {
  const recursive = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    }
    return Math.max(recursive(node.left), recursive(node.right)) + 1;
  };

  return recursive(root);
}

// BFS
// Time Complexity: O(n)
// Space Complexity: O(n)
export function maxDepth_BFS(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const queue: TreeNode[] = [root];
  let depth = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    depth++;
  }

  return depth;
}
