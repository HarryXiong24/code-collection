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

  if (!root) {
    return result;
  }

  const recursion = (node: TreeNode, res: number[]) => {
    if (!node.left && !node.right) {
      result.push([...res, node.val].join('->'));
      return;
    }

    res.push(node.val);
    node.left && recursion(node.left, [...res]);
    node.right && recursion(node.right, [...res]);
  };

  recursion(root, []);

  return result;
}
