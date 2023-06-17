// 145. Binary Tree Postorder Traversal

// Given the root of a binary tree, return the postorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [3,2,1]

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

export function postorderTraversal_Recursive(root: TreeNode | null): number[] {
  const res: number[] = [];

  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    }
    recursive(node.left);
    recursive(node.right);
    res.push(node.val);
  };

  recursive(root);

  return res;
}

export function postorderTraversal_Iterative(root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return res;
  }

  let node: TreeNode | null = root;
  let prev: TreeNode | null = null;

  while (node && stack.length) {
    while (node !== null) {
      stack.push(node);
      node = node.left!;
    }
    node = stack.pop()!;
    if (node.right === null || node.right === prev) {
      res.push(node.val);
      prev = node;
      node = null;
    } else {
      stack.push(node);
      node = node.right!;
    }
  }

  return res;
}
