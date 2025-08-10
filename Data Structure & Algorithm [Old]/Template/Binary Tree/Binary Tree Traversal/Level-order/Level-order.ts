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

export function levelOrder(root: TreeNode | null): number[][] {
  const res: number[][] = [];
  const queue: TreeNode[] = [];

  if (!root) {
    return res;
  }

  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    const temp: number[] = [];
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      temp.push(current.val);
      if (current.left) {
        queue.push(current?.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
    res.push(temp);
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
const res = levelOrder(root);
console.log(res);
