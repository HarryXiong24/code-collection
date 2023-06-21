// 297. Serialize and Deserialize Binary Tree

// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

// Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

// Example 1:
// Input: root = [1,2,3,null,null,4,5]
// Output: [1,2,3,null,null,4,5]

// Example 2:
// Input: root = []
// Output: []

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

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// DFS
// use # to represent null
export function serialize_DFS(root: TreeNode | null): string {
  const path: Array<TreeNode | null> = [];
  const recursive = (node: TreeNode | null) => {
    path.push(node);
    if (!node) {
      return;
    }
    recursive(node.left);
    recursive(node.right);
  };

  recursive(root);

  return path.map((item) => (item === null ? '#' : item.val)).join(',');
}

export function deserialize_DFS(data: string): TreeNode | null {
  const array_data: Array<TreeNode | null> = data
    .split(',')
    .map((item) => (item === '#' ? null : new TreeNode(Number(item))));

  const recursive = (path: Array<TreeNode | null>) => {
    if (!path.length) {
      return null;
    }

    const current = path.shift()!;

    if (!current) {
      return null;
    }

    current.left = recursive(path);
    current.right = recursive(path);

    return current;
  };

  return recursive(array_data);
}
