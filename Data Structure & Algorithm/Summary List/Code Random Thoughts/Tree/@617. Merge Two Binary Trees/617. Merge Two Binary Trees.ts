// 617. Merge Two Binary Trees

// You are given two binary trees root1 and root2.

// Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

// Return the merged tree.

// Note: The merging process must start from the root nodes of both trees.

// Example 1:
// Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
// Output: [3,4,5,5,4,null,7]

// Example 2:
// Input: root1 = [1], root2 = [1,2]
// Output: [2,2]

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

export function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 && !root2) {
    return null;
  }

  const recursion = (node1: TreeNode | null, node2: TreeNode | null) => {
    if (!node1 && !node2) {
      return null;
    } else if (node1 && !node2) {
      return node1;
    } else if (!node1 && node2) {
      return node2;
    } else {
      const node = new TreeNode(node1!.val + node2!.val);
      node.left = recursion(node1!.left, node2!.left);
      node.right = recursion(node1!.right, node2!.right);
      return node;
    }
  };

  return recursion(root1, root2);
}
