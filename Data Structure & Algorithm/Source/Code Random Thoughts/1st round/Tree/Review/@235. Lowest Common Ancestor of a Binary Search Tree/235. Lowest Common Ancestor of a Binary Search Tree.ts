// 235. Lowest Common Ancestor of a Binary Search Tree

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

export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node || !p || !q) {
      return null;
    }

    if (node.val < p.val && node.val < q.val) {
      return recursion(node.right);
    } else if (node.val > p.val && node.val > q.val) {
      return recursion(node.left);
    } else {
      return node;
    }
  };

  return recursion(root);
}
