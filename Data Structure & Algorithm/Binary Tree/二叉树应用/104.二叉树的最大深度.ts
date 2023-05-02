// 104 二叉树的最大深度

/**
 * 给定一个二叉树，找出其最大深度
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 *   3
 *  / \
 * 9  20
 *   /  \
 *  15   7
 * 返回它的最大深度 3
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

// 深度优先搜索解法
export function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }
  let result = 1;
  // 深度搜索
  function preOrderTraversalNode(node: TreeNode | null, depth: number): void {
    if (node === null) {
      return;
    }
    // 比较深度，即时更新
    result = Math.max(result, depth);
    preOrderTraversalNode(node.left, depth + 1);
    preOrderTraversalNode(node.right, depth + 1);
  }
  // 执行该方法
  preOrderTraversalNode(root, 1);

  return result;
}

// 广度优先搜索解法
export function maxDepth2(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }
  const result: number[][] = [];
  const q: TreeNode[] = [root];
  while (q.length !== 0) {
    const count = q.length;
    result.push([]);
    for (let i = 1; i <= count; i++) {
      const node = q.shift() as TreeNode;
      result[result.length - 1].push(node.val);
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
  }

  return result.length;
}
