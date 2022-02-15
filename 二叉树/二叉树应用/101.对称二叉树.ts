// 101 对称二叉树

/**
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称
 * 示例 1：
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 示例 2：
 * 输入：root = [1,2,2,null,3,null,3]
 * 输出：false
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

/**
 * 可以实现这样一个递归函数：
 * 通过「同步移动」两个指针的方法来遍历这棵树，p 指针和 q 指针一开始都指向这棵树的根
 * 随后 p 右移时，q 左移，p 左移时，q 右移
 * 每次检查当前 p 和 q 节点的值是否相等，如果相等再判断左右子树是否对称。
 */

function checkNode(left: TreeNode | null, right: TreeNode | null): boolean {
  if (left === null && right === null) {
    return true;
  }
  if (left === null || right === null) {
    return false;
  }
  const result = left.val === right.val && checkNode(left.left, right.right) && checkNode(left.right, right.left);
  return result;
}

export function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) {
    return true;
  }
  return checkNode(root, root);
}
