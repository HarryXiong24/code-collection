// 144. Binary Tree Preorder Traversal

// Given the root of a binary tree, return the preorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [1,2,3]

// Example 2:
// Input: root = []
// Output: []

// Example 3:
// Input: root = [1]
// Output: [1]

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

export function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    result.push(node.val);
    recursion(node.left);
    recursion(node.right);
  };

  recursion(root);

  return result;
}

export function preorderTraversalIteration(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  if (!root) {
    return result;
  }
  stack.push(root);

  while (stack.length) {
    const current = stack.pop()!;
    result.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }

  return result;
}
