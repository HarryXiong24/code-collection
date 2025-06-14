// 513. Find Bottom Left Tree Value

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

export function findBottomLeftValue_recursion(root: TreeNode | null): number {
  let maxDepth: number = 0;
  let res: number = 0;

  if (!root) {
    return res;
  }

  const recursion = (node: TreeNode, depth: number): void => {
    if (!node.left && !node.right) {
      if (depth > maxDepth) {
        res = node.val;
        maxDepth = depth;
      }
      return;
    }

    node.left && recursion(node.left, depth + 1);
    node.right && recursion(node.right, depth + 1);
  };

  recursion(root, 1);

  return res;
}
