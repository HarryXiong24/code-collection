// 112. Path Sum

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

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) {
    return false;
  }

  let res: boolean[] = [];

  const recursion = (node: TreeNode, sum: number) => {
    if (!node.left && !node.right) {
      // 到达叶子节点
      if (sum + node.val === targetSum) {
        res.push(true);
      }
      return;
    }

    node.left && recursion(node.left, sum + node.val);
    node.right && recursion(node.right, sum + node.val);
  };

  recursion(root, 0);

  return res.includes(true);
}
