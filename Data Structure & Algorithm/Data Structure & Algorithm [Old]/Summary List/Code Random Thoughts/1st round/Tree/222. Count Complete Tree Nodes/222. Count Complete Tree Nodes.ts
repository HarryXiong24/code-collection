// 222. Count Complete Tree Nodes

// Given the root of a complete binary tree, return the number of the nodes in the tree.

// According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Design an algorithm that runs in less than O(n) time complexity.

// Example 1:
// Input: root = [1,2,3,4,5,6]
// Output: 6

// Example 2:
// Input: root = []
// Output: 0

// Example 3:
// Input: root = [1]
// Output: 1

// Constraints:
// The number of nodes in the tree is in the range [0, 5 * 104].
// 0 <= Node.val <= 5 * 104
// The tree is guaranteed to be complete.

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

export function countNodes(root: TreeNode | null): number {
  const queue: TreeNode[] = [];
  let count = 0;

  if (!root) {
    return count;
  }
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      count += 1;
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
  }

  return count;
}

export function countNodes_Recursion(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left = recursion(node.left);
    const right = recursion(node.right);

    return left + right + 1;

    // return recursion(node.left) + recursion(node.right) + 1
  };

  return recursion(root);
}
