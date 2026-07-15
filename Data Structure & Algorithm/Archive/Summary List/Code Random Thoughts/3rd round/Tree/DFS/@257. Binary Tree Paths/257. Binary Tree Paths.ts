// 257. Binary Tree Paths

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

export function binaryTreePaths(root: TreeNode | null): string[] {
  const result: string[] = [];
  const path: number[] = [];

  if (!root) {
    return result;
  }

  const recursion = (node: TreeNode | null) => {
    if (!node) return;

    path.push(node.val);

    if (!node.left && !node.right) {
      result.push(path.join('->'));
    }

    recursion(node.left);
    recursion(node.right);

    path.pop();
  };

  recursion(root);

  return result;
}
