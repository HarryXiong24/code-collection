// 222. Count Complete Tree Nodes

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

export function countNodes(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const recursion = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left_count = recursion(node.left);
    const right_count = recursion(node.right);

    return left_count + right_count + 1;
  };

  return recursion(root);
}
