// 101. Symmetric Tree

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

export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }

  const recursion = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (!left && !right) {
      return true;
    } else if (left && !right) {
      return false;
    } else if (!left && right) {
      return false;
    } else {
      if (left!.val === right!.val) {
        return recursion(left!.left, right!.right) && recursion(left!.right, right!.left);
      } else {
        return false;
      }
    }
  };

  return recursion(root.left, root.right);
}
