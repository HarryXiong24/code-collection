// 145 二叉树的后序遍历

/**
 * 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[3,2,1]
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 示例 3：
 * 输入：root = [1]
 * 输出：[1]
 */

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

export function postorderTraversal(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let node: TreeNode | null = root;
  let prev: TreeNode | null = null;
  while (node !== null || stack.length !== 0) {
    while (node !== null) {
      stack.push(node);
      node = node.left!;
    }
    node = stack.pop()!;
    if (node.right === null || node.right === prev) {
      result.push(node.val);
      prev = node;
      node = null;
    } else {
      stack.push(node);
      node = node.right!;
    }
  }
  return result;
}
