// Balanced Tree

// When using a tree data structure, it's common for the tree to become unbalanced over time due to the insertion order of nodes, which can in turn affect the performance of our programs. Let's define a balanced tree as one where the difference in height of the left and right subtrees is at most one, for all nodes in the given tree. Write a function is_balanced(node) that determines whether a binary tree is balanced or not.

// Input: The root node of a binary tree

// Output: True if the tree is balanced, False otherwise.

// Assume you are given the root node of a tree that conforms to the following interface:

// class Node {
//   left: Node
//   right: Node
//   value: any
// }
// Examples
// Example 1: Balanced

// Tree:
//       a
//      / \
//     b   c
//    / \   \
//   d   e   f

// is_balanced(a) # => True
// Example 2: Balanced

// Tree:
//      a
//     / \
//    b   c
//         \
//          d

// is_balanced(a) # => True
// Example 3: Not Balanced

// Tree:
//      a
//     / \
//    b   c
//         \
//          d
//           \
//            e

// is_balanced(a) # => False
// Example 4: Not Balanced

// Tree:
//       a
//      / \
//     b   c
//    /     \
//   d       e
//  /         \
// f           g

// is_balanced(a) # => False
// Note that while the last tree seems symmetrical, it is not balanced because nodes b and c are not balanced.

// JavaScript
// JavaScript
// 123456789101112131415
// class Node {
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }

// function isBalanced(node) {
//     // your code goes here

// Output
// Test Results
// Hide console
// Dashboard

class Node {
  value: number;
  left: Node | null;
  right: Node | null;
  constructor(value: number, left: Node | null = null, right: Node | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export function isBalanced(node: Node) {
  const recursion = (current_node: Node | null): { balanced: boolean; height: number } => {
    if (!current_node) {
      return { balanced: true, height: -1 };
    }

    const left = recursion(current_node.left);
    if (left.balanced) {
      return { balanced: false, height: left.height };
    }

    const right = recursion(current_node.right);
    if (right.balanced) {
      return { balanced: false, height: right.height };
    }

    const height = Math.max(left.height, right.height) + 1;
    const balanced = Math.abs(left.height - right.height) <= 1 ? true : false;

    return {
      balanced,
      height,
    };
  };
}

// debug your code below
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);
console.log(isBalanced(root));
