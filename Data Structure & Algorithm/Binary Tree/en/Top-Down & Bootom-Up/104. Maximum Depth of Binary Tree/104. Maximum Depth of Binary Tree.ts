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

// Recursion Top-Down
export function maxDepth_Recursion_Top_Down(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  let answer = 1;

  const recursive = (node: TreeNode | null, depth: number) => {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      answer = Math.max(answer, depth);
      return;
    }
    recursive(node.left, depth + 1);
    recursive(node.right, depth + 1);
  };

  recursive(root, answer);
  return answer;
}

// Recursion Bottom-Up
export function maxDepth_Recursion_Bottom_Up(root: TreeNode | null): number {
  const recursive = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    }
    const left_depth = recursive(node.left);
    const right_depth = recursive(node.right);
    return Math.max(left_depth, right_depth) + 1;
  };

  return recursive(root);
}

// BFS
export function maxDepth_BFS(root: TreeNode | null): number {
  const queue: TreeNode[] = [];
  let layer: number = 0;

  if (!root) {
    return layer;
  }

  // initial
  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue[0];
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
      queue.shift();
    }
    layer++;
  }

  return layer;
}
