// 515. Find Largest Value in Each Tree Row

// Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

// Example 1:
// Input: root = [1,3,2,5,3,null,9]
// Output: [1,3,9]

// Example 2:
// Input: root = [1,2,3]
// Output: [1,3]

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

export function largestValues(root: TreeNode | null): number[] {
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
    const max = Math.max(...temp);
    result.push(max);
  }

  return result;
}
