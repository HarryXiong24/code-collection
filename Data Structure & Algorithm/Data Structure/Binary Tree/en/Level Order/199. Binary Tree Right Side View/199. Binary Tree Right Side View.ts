// 199. Binary Tree Right Side View

// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// Example 1:
// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]

// Example 2:
// Input: root = [1,null,3]
// Output: [1,3]

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

export function rightSideView(root: TreeNode | null): number[] {
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
    result.push(temp.pop()!);
  }

  return result;
}
