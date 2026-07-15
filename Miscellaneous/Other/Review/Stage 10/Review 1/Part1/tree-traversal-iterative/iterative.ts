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

export function preorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return result;
  }
  stack.push(root);

  while (stack.length) {
    const current = stack.pop()!;

    result.push(current.val);

    current.right && stack.push(current.right);
    current.left && stack.push(current.left);
  }

  return result;
}

export function postorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return result;
  }
  stack.push(root);

  while (stack.length) {
    const current = stack.pop()!;

    result.push(current.val);

    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }

  return result.reverse();
}

export function inorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return result;
  }

  let node: TreeNode | null = root;

  while (node || stack.length) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const current = stack.pop()!;
      result.push(current.val);
      node = current.right;
    }
  }

  return result;
}

// test
const root: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: {
        val: 7,
        left: null,
        right: null,
      },
      right: null,
    },
    right: null,
  },
};

const res1 = preorder(root);
const res2 = postorder(root);
const res3 = inorder(root);
console.log(res1);
console.log(res2);
console.log(res3);
