// 1008. Construct Binary Search Tree from Preorder Traversal

// Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root.

// It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.

// A binary search tree is a binary tree where for every node, any descendant of Node.left has a value strictly less than Node.val, and any descendant of Node.right has a value strictly greater than Node.val.

// A preorder traversal of a binary tree displays the value of the node first, then traverses Node.left, then traverses Node.right.

// Example 1:
// Input: preorder = [8,5,1,7,10,12]
// Output: [8,5,10,1,7,null,12]

// Example 2:
// Input: preorder = [1,3]
// Output: [1,null,3]

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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const recursive = (preorder: number[], inorder: number[]) => {
    if (!preorder.length || !inorder.length) {
      return null;
    }

    const currentVal = preorder.shift()!;
    const currentIndex = inorder.indexOf(currentVal);
    const node = new TreeNode(currentVal);

    node.left = recursive(preorder, inorder.slice(0, currentIndex));
    node.right = recursive(preorder, inorder.slice(currentIndex + 1));

    return node;
  };

  return recursive(preorder, inorder);
}

// According to the characteristic of Binary Search Tree, the inorder of it is a sequential array
export function bstFromPreorder(preorder: number[]): TreeNode | null {
  const inorder = [...preorder];
  inorder.sort((a, b) => a - b);

  return buildTree(preorder, inorder);
}
