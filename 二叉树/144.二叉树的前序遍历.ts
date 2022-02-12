// 144 二叉树的前序遍历

/**
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[1,2,3]
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 示例 3：
 * 输入：root = [1]
 */

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

function preOrderTraversalNode(node: TreeNode | null, arr: number[]) {
  if (node !== null) {
    arr.push(node.val);
    preOrderTraversalNode(node.left, arr);
    preOrderTraversalNode(node.right, arr);
  }
}

export function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (root === null) {
    return result;
  } else {
    preOrderTraversalNode(root, result);
  }

  return result;
}
