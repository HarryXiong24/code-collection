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

export function preorderTraversalIterative(root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];

  if (!root) {
    return res;
  }

  let node: TreeNode | null = root;

  while (node || stack.length) {
    while (node) {
      res.push(node.val);
      stack.push(node);
      node = node.left;
    }

    node = stack.pop()!;
    node = node.right;
  }

  return res;
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
const res = preorderTraversalIterative(root);
console.log(res);
