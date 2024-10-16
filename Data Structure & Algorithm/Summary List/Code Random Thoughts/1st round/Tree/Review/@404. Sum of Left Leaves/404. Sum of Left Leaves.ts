// 404. Sum of Left Leaves

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

export function sumOfLeftLeaves(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let sum = 0;

  const recursion = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    if (node.left) {
      if (!node.left.left && !node.left.right) {
        sum += node.left.val;
      }
      recursion(node.left);
    }
    if (node.right) {
      recursion(node.right);
    }
  };

  recursion(root);

  return sum;
}
