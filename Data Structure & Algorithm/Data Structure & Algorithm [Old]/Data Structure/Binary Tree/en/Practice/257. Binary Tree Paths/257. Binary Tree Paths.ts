// 257. Binary Tree Paths

// Given the root of a binary tree, return all root-to-leaf paths in any order.

// A leaf is a node with no children.

// Example 1:
// Input: root = [1,2,3,null,5]
// Output: ["1->2->5","1->3"]

// Example 2:
// Input: root = [1]
// Output: ["1"]

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
  const results: number[][] = [];

  if (!root) {
    return [];
  }

  const recursion = (node: TreeNode, result: number[]) => {
    if (!node.left && !node.right) {
      result.push(node.val);
      results.push([...result]);
      return;
    }

    result.push(node.val);
    node.left && recursion(node.left, [...result]);
    node.right && recursion(node.right, [...result]);
  };

  recursion(root, []);

  return results.map((item) => {
    return item.join('->');
  });
}
