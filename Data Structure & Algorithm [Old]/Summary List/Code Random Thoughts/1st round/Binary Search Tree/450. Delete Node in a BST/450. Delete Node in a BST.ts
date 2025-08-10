// 450. Delete Node in a BST

// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:
// Search for a node to remove.
// If the node is found, delete the node.

// Example 1:
// Input: root = [5,3,6,2,4,null,7], key = 3
// Output: [5,4,6,2,null,null,7]
// Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
// One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
// Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

// Example 2:
// Input: root = [5,3,6,2,4,null,7], key = 0
// Output: [5,3,6,2,4,null,7]
// Explanation: The tree does not contain a node with value = 0.

// Example 3:
// Input: root = [], key = 0
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

export function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) {
    return null;
  }

  const recursion = (node: TreeNode | null, parent: TreeNode | null) => {
    if (!node) {
      return false;
    }

    if (key < node.val) {
      return recursion(node.left, node);
    } else if (key > node.val) {
      return recursion(node.right, node);
    } else {
      if (!node.left || !node.right) {
        const child = node.left ? node.left : node.right;

        if (parent === null) {
          root = child;
        } else if (parent.left === node) {
          parent.left = child;
        } else {
          parent.right = child;
        }
      } else {
        let min_node = node.right;
        let parent_node = node;

        while (min_node.left) {
          parent_node = min_node;
          min_node = min_node.left;
        }

        node.val = min_node.val;
        if (parent_node.left === min_node) {
          parent_node.left = min_node.right;
        } else {
          parent_node.right = min_node.right;
        }
      }

      return true;
    }
  };

  recursion(root, null);
  return root;
}
