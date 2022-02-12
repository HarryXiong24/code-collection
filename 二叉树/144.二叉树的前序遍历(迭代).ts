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
/**
 * 解题思路
 * 定义一个栈
 * 将根元素压入栈中
 * 迭代，当栈中有元素时，就出栈,然后将该元素的两个节点压入栈中
 * 注意，因为栈是先进后出，所以先压入右节点，再压入左节点
 */
export function preorderTraversal(root: TreeNode | null): number[] {
  // root 为 null 则直接返回
  if (root === null) {
    return [];
  }
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.val);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }

  return result;
}
