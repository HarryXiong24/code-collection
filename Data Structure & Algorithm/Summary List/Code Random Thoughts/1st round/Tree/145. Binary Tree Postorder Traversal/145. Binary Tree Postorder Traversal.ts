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

export function postorderTraversal(root: TreeNode | null): number[] {
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

// preorder: root -> left -> right => root -> right -> left => left -> right -> root
export function postorderTraversalIteration(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  if (!root) {
    return result;
  }
  stack.push(root);

  while (stack.length) {
    const current = stack.pop()!;
    result.push(current.val);
    if (current.left) {
      stack.push(current.left);
    }
    if (current.right) {
      stack.push(current.right);
    }
  }

  return result.reverse();
}
