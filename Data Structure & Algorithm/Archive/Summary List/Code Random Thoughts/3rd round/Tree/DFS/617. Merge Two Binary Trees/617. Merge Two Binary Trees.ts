// 617. Merge Two Binary Trees

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

export function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 && !root2) {
    return null;
  } else if (root1 && !root2) {
    return root1;
  } else if (!root1 && root2) {
    return root2;
  } else {
    const node = new TreeNode(root1!.val + root2!.val);

    node.left = mergeTrees(root1!.left, root2!.left);
    node.right = mergeTrees(root1!.right, root2!.right);

    return node;
  }
}
