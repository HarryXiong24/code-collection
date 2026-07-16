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
export function preorderTraversalIteration(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  if (!root) {
    return result;
  }
  stack.push(root);

  while (stack.length) {
    const current = stack.pop()!;
    result.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }

  return result;
}

// inorder
export function inorderTraversalIterative(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  if (!root) {
    return result;
  }

  let node: TreeNode | null = root;
  while (node || stack.length) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop()!;
      result.push(node.val);
      node = node.right;
    }
  }

  return result;
}

// postorder
export function postorderTraversalIteration(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  if (!root) {
    return result;
  }
  stack.push(root);

  while (stack.length) {
    const current = stack.pop()!;
    result.push(current.val);
    if (current.left) {
      stack.push(current.left);
    }
    if (current.right) {
      stack.push(current.right);
    }
  }

  return result.reverse();
}
