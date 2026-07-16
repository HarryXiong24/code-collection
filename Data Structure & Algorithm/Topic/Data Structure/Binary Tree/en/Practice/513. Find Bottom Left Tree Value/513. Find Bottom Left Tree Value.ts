// 513. Find Bottom Left Tree Value

// Given the root of a binary tree, return the leftmost value in the last row of the tree.

// Example 1:
// Input: root = [2,1,3]
// Output: 1

// Example 2:
// Input: root = [1,2,3,4,null,5,6,null,null,7]
// Output: 7

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

export function findBottomLeftValue(root: TreeNode | null): number {
  const queue: TreeNode[] = [];
  let res = -1;

  if (!root) {
    return res;
  }

  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      if (i === 0) {
        res = current.val;
      }
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
  }

  return res;
}

export function findBottomLeftValue_recursion(root: TreeNode | null): number {
  let maxDepth: number = 0;
  let res: number = 0;

  if (!root) {
    return res;
  }

  const recursion = (root: TreeNode, depth: number): void => {
    if (root.left === null && root.right === null) {
      if (depth > maxDepth) {
        maxDepth = depth;
        res = root.val;
      }
      return;
    }
    root.left && recursion(root.left, depth + 1);
    root.right && recursion(root.right, depth + 1);
  };

  recursion(root, 1);

  return res;
}
