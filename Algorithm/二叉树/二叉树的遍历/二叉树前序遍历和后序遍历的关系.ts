// 二叉树前序遍历和后序遍历的关系

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
    // 根 -> 左 -> 右
    result.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return result;
}

export function postorderTraversal(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const result: number[] = [];
  const stack: TreeNode[] = [];
  while (stack.length) {
    const node = stack.pop()!;
    // 根 -> 右 -> 左
    result.push(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return result.reverse(); // 左->右->根
}
