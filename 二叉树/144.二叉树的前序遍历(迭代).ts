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

// 迭代解法
export function preorderTraversal(root: TreeNode | null): number[] {
  // root 为 null 则直接返回
  if (root === null) {
    return [];
  }
  const result: number[] = [];
  const stack: TreeNode[] = [];

  let node = root;
  while (stack.length !== 0 || node !== null) {
    while (node !== null) {
      result.push(node.val);
      stack.push(node);
      node = node.left!;
    }
    node = stack.pop()!;
    node = node.right!;
  }

  return result;
}
