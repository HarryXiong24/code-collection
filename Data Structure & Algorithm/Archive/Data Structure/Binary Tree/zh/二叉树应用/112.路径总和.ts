// 112 路径总和

/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targettargetSum
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targettargetSum
 * 如果存在，返回 true ；否则，返回 false
 * 叶子节点是指没有子节点的节点。
 * 示例 1：
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targettargetSum = 22
 * 输出：true
 * 解释：等于目标和的根节点到叶节点路径如上图所示。
 * 示例 2：
 * 输入：root = [1,2,3], targettargetSum = 5
 * 输出：false
 * 解释：树中存在两条根节点到叶子节点的路径：
 * (1 --> 2): 和为 3
 * (1 --> 3): 和为 4
 * 不存在 targetSum = 5 的根节点到叶子节点的路径。
 * 示例 3：
 * 输入：root = [], targettargetSum = 0
 * 输出：false
 * 解释：由于树是空的，所以不存在根节点到叶子节点的路径。
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

// 递归
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root == null) {
    return false;
  }
  if (root.left == null && root.right == null) {
    return targetSum == root.val;
  }
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}

// BFS 法
// 双队列，一个队列常规存放 node 节点，一个队列存放 node 节点里累加的值 val
export function hasPathSum2(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) {
    return false;
  }
  const q: TreeNode[] = [root];
  const q_val: number[] = [root.val];
  while (q.length) {
    const node = q.pop()!;
    const node_val = q_val.pop()!;
    if (node.left) {
      q_val.push(node_val + node.left.val);
      q.push(node.left);
    }
    if (node.right) {
      q_val.push(node_val + node.right.val);
      q.push(node.right);
    }
    if (node.left === null && node.right === null) {
      if (node_val === targetSum) {
        return true;
      }
      continue;
    }
  }
  return false;
}
