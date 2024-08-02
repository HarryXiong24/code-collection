// 538. Convert BST to Greater Tree

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

export function convertBST(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  let pre = 0;
  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    recursive(node.right);
    node.val = node.val + pre;
    pre = node.val;
    recursive(node.left);
  };

  recursive(root);

  return root;
}
