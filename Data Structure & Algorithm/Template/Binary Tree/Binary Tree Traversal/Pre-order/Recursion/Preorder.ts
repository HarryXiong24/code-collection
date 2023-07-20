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

export function preorderTraversalRecursive(root: TreeNode | null): number[] {
  const res: number[] = [];

  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    } else {
      res.push(node.val);
      recursive(node?.left);
      recursive(node?.right);
    }
  };

  recursive(root);

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
const res = preorderTraversalRecursive(root);
console.log(res);
