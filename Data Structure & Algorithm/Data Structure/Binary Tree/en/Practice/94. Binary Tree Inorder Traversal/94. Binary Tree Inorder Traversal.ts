// 94. Binary Tree Inorder Traversal

// Given the root of a binary tree, return the inorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [1,3,2]

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

export function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    recursion(node.left);
    result.push(node.val);
    recursion(node.right);
  };

  recursion(root);

  return result;
}

export function inorderTraversalIterative(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  if (!root) {
    return result;
  }

  let node: TreeNode | null = root;
  while (node || stack.length) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop()!;
      result.push(node.val);
      node = node.right;
    }
  }

  return result;
}
