// 106. Construct Binary Tree from Inorder and Postorder Traversal

// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

// Example 1:
// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]

// Example 2:
// Input: inorder = [-1], postorder = [-1]
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

export function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const recursive = (inorder: number[], postorder: number[]) => {
    if (!inorder.length || !postorder.length) {
      return null;
    }

    const currentVal = postorder.pop()!;
    const node = new TreeNode(currentVal);
    const currentIndex = inorder.indexOf(currentVal);

    node.right = recursive(inorder.slice(currentIndex + 1), postorder);
    node.left = recursive(inorder.slice(0, currentIndex), postorder);

    return node;
  };

  return recursive(inorder, postorder);
}
