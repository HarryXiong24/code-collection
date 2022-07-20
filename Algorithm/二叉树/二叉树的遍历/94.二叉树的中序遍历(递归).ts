// 94 二叉树的中序遍历

/**
 * 给定一个二叉树的根节点 root ，返回它的 中序 遍历
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 示例 3：
 * 输入：root = [1]
 * 输出：[1]
 * 示例 4：
 * 输入：root = [1,2]
 * 输出：[2,1]
 * 示例 5：
 * 输入：root = [1,null,2]
 * 输出：[1,2]
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

export function inorderTraversalNode(node: TreeNode | null, arr: number[]): void {
  if (node !== null) {
    inorderTraversalNode(node.left, arr);
    arr.push(node.val);
    inorderTraversalNode(node.right, arr);
  }
}

export function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (root === null) {
    return result;
  } else {
    inorderTraversalNode(root, result);
  }
  return result;
}
