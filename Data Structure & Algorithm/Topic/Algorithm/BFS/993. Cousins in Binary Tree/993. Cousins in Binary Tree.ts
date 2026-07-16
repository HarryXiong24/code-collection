// 993. Cousins in Binary Tree

// Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

// Two nodes of a binary tree are cousins if they have the same depth with different parents.

// Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.

// Example 1:
// Input: root = [1,2,3,4], x = 4, y = 3
// Output: false

// Example 2:
// Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
// Output: true

// Example 3:
// Input: root = [1,2,3,null,4], x = 2, y = 3
// Output: false

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

export function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  const queue: TreeNode[] = [];

  if (!root) {
    return false;
  }

  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    const flag: boolean[] = [false, false];
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      if (x === current.val) {
        flag[0] = true;
      }
      if (y === current.val) {
        flag[1] = true;
      }
      // Two nodes of a binary tree are cousins if they have the same depth with different parents.
      if (
        (current.left?.val === x && current?.right?.val === y) ||
        (current.left?.val === y && current.right?.val === x)
      ) {
        return false;
      }
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    if (flag[0] === true && flag[1] === true) {
      return true;
    }
  }

  return false;
}
