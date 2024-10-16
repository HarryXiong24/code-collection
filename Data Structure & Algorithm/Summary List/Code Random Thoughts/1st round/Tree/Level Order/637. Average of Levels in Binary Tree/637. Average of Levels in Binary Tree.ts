// 637. Average of Levels in Binary Tree

// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [3.00000,14.50000,11.00000]
// Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
// Hence return [3, 14.5, 11].

// Example 2:
// Input: root = [3,9,20,15,7]
// Output: [3.00000,14.50000,11.00000]

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

export function averageOfLevels(root: TreeNode | null): number[] {
  const result: number[] = [];
  const queue: TreeNode[] = [];

  if (!root) {
    return result;
  }
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    const temp: number[] = [];
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      temp.push(current.val);

      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    const mean = temp.reduce((prev, cur) => prev + cur) / temp.length;
    result.push(mean);
  }

  return result;
}
