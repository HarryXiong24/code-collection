// Construct Binary Tree from Inorder and Postorder Traversal

// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

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
  const recursive = (inorder: number[], postorder: number[]): TreeNode | null => {
    if (!inorder.length || !postorder.length) {
      return null;
    }

    const currentVal = postorder.pop()!;
    const currentIndex = inorder.indexOf(currentVal);
    const node = new TreeNode(currentVal);

    // here's order is important
    node.right = recursive(inorder.slice(currentIndex + 1), postorder);
    node.left = recursive(inorder.slice(0, currentIndex), postorder);

    return node;
  };

  return recursive(inorder, postorder);
}

// test
const levelOrder = (root: TreeNode | null): Array<number | null> => {
  const res: Array<number | null> = [];
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
const inorder = [9, 3, 15, 20, 7];
const postorder = [9, 15, 7, 20, 3];
const res = buildTree(inorder, postorder);
const printTree = levelOrder(res);
console.log(printTree);
