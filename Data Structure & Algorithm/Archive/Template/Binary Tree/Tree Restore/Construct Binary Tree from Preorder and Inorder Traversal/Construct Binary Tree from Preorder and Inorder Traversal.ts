// Construct Binary Tree from Preorder and Inorder Traversal

// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

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
    const currentIndex = inorder.indexOf(currentVal);
    const node = new TreeNode(currentVal);

    node.left = recursive(preorder, inorder.slice(0, currentIndex));
    node.right = recursive(preorder, inorder.slice(currentIndex + 1));

    return node;
  };

  return recursive(preorder, inorder);
}

// test
const levelOrder = (root: TreeNode | null): number[] => {
  const res: number[] = [];
  const queue: TreeNode[] = [];

  if (!root) {
    return res;
  }

  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      res.push(current.val);
      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  return res;
};
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];
const res = buildTree(preorder, inorder);
const printTree = levelOrder(res);
console.log(printTree);
