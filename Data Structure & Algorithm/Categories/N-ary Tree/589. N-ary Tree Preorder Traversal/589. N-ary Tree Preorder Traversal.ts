// 589. N-ary Tree Preorder Traversal

// Given the root of an n-ary tree, return the preorder traversal of its nodes' values.

// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

// Example 1:
// Input: root = [1,null,3,2,4,null,5,6]
// Output: [1,3,5,6,2,4]

// Example 2:
// Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]

// Definition for node.
class Node {
  val: number;
  children: Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

// Recursive
export function preorder(root: Node | null): number[] {
  const res: number[] = [];
  const recursive = (node: Node | null) => {
    if (!node) {
      return;
    }

    res.push(node.val);

    for (const child of node.children) {
      recursive(child);
    }
  };
  recursive(root);
  return res;
}
