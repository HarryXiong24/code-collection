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

// preorder
export function preorderTraversal(root: TreeNode | null): number[] {
  let helperStack: (TreeNode | null)[] = [];
  let res: number[] = [];
  let curNode: TreeNode | null;

  if (!root) {
    return res;
  }
  helperStack.push(root);

  while (helperStack.length) {
    curNode = helperStack.pop()!;

    if (curNode) {
      if (curNode.right) {
        helperStack.push(curNode.right);
      }

      if (curNode.left) {
        helperStack.push(curNode.left);
      }

      helperStack.push(curNode);
      helperStack.push(null);
    } else {
      curNode = helperStack.pop()!;
      res.push(curNode.val);
    }
  }

  return res;
}

// inorder
export function inorderTraversal(root: TreeNode | null): number[] {
  let helperStack: (TreeNode | null)[] = [];
  let res: number[] = [];
  let curNode: TreeNode | null;

  if (root === null) {
    return res;
  }
  helperStack.push(root);

  while (helperStack.length) {
    curNode = helperStack.pop()!;

    if (curNode) {
      if (curNode.right) {
        helperStack.push(curNode.right);
      }

      helperStack.push(curNode);
      helperStack.push(null);

      if (curNode.left) {
        helperStack.push(curNode.left);
      }
    } else {
      curNode = helperStack.pop()!;
      res.push(curNode.val);
    }
  }
  return res;
}

// postorder
export function postorderTraversal(root: TreeNode | null): number[] {
  let helperStack: (TreeNode | null)[] = [];
  let res: number[] = [];
  let curNode: TreeNode | null;

  if (root === null) {
    return res;
  }
  helperStack.push(root);

  while (helperStack.length) {
    curNode = helperStack.pop()!;

    if (curNode) {
      helperStack.push(curNode);
      helperStack.push(null);

      if (curNode.right) {
        helperStack.push(curNode.right);
      }

      if (curNode.left) {
        helperStack.push(curNode.left);
      }
    } else {
      curNode = helperStack.pop()!;
      res.push(curNode.val);
    }
  }
  return res;
}
