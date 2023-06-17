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

export function inorderTraversal_Recursive(root: TreeNode | null): number[] {
  const res: number[] = [];

  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    }
    recursive(node.left);
    res.push(node.val);
    recursive(node.right);
  };

  return res;
}

export function inorderTraversal_Iterative(root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return res;
  }

  stack.push(root);
  let node = root;

  while (stack.length) {
    while (node && node.left) {
      stack.push(node.left);
      node = node.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    node = current;
  }

  return res;
}
