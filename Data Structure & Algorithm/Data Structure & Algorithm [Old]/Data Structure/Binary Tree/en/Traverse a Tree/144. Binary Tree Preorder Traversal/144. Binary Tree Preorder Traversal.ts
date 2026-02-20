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

export function preorderTraversal_Recursive(root: TreeNode | null): number[] {
  const res: number[] = [];

  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    } else {
      res.push(node.val);
      recursive(node?.left);
      recursive(node?.right);
    }
  };

  recursive(root);

  return res;
}

export function preorderTraversal_Iterative(root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return res;
  }

  let node: TreeNode | null = root;

  while (node || stack.length) {
    while (node) {
      res.push(node.val);
      stack.push(node);
      node = node.left;
    }

    node = stack.pop()!;
    node = node.right;
  }

  return res;
}
