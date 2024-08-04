// 111. Minimum Depth of Binary Tree

// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 2

// Example 2:
// Input: root = [2,null,3,null,4,null,5,null,6]
// Output: 5

// Constraints:
// The number of nodes in the tree is in the range [0, 105].
// -1000 <= Node.val <= 1000

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

export function minDepth(root: TreeNode | null): number {
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

      if (!current.left && !current.right) {
        return height + 1;
      }

      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    height++;
  }

  return height;
}

export function minDepth2(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    if (node.left && !node.right) {
      return 1 + recursion(node.left);
    }
    if (!node.left && node.right) {
      return 1 + recursion(node.right);
    }

    return 1 + Math.min(recursion(node.left), recursion(node.right));
  };

  return recursion(root);
}
