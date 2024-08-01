// 226. Invert Binary Tree

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

export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    recursion(node.left);
    recursion(node.right);
  };

  recursion(root);

  return root;
}
