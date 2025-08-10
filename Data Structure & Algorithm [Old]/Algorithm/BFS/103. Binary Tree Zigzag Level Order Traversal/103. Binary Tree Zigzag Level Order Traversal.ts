// 103. Binary Tree Zigzag Level Order Traversal

// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]

// Example 2:
// Input: root = [1]
// Output: [[1]]

// Example 3:
// Input: root = []
// Output: []

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

export function zigzagLevelOrder(root: TreeNode | null): number[][] {
  const queue: TreeNode[] = [];
  const result: number[][] = [];

  if (!root) {
    return result;
  }

  queue.push(root);
  let layer = 1;
  while (queue.length) {
    const size = queue.length;
    const temp: number[] = [];
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      if (layer % 2 === 1) {
        temp.push(current.val);
      } else {
        temp.unshift(current.val);
      }
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    result.push(temp);
    layer++;
  }

  return result;
}
