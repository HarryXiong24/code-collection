// 105. Construct Binary Tree from Preorder and Inorder Traversal

// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

// Example 1:
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]

// Example 2:
// Input: preorder = [-1], inorder = [-1]
// Output: [-1]

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

export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const recursive = (preorder: number[], inorder: number[]) => {
    if (!preorder.length || !inorder.length) {
      return null;
    }

    const currentVal = preorder.shift()!;
    const node = new TreeNode(currentVal);
    const currentIndex = inorder.indexOf(currentVal);

    node.left = recursive(preorder, inorder.slice(0, currentIndex));
    node.right = recursive(preorder, inorder.slice(currentIndex + 1));

    return node;
  };

  return recursive(preorder, inorder);
}
