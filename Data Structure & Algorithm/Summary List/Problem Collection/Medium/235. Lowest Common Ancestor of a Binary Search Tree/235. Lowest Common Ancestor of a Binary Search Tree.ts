// 235. Lowest Common Ancestor of a Binary Search Tree

// Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Example 1:
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// Output: 6
// Explanation: The LCA of nodes 2 and 8 is 6.

// Example 2:
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// Output: 2
// Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

// Example 3:
// Input: root = [2,1], p = 2, q = 1
// Output: 2

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

// Recursion
// Time Complexity: O(n)
// Space Complexity: O(n)
export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let ancestor_p: TreeNode | null = p;
  let ancestor_q: TreeNode | null = q;
  const recursive = (node: TreeNode | null) => {
    if (!node) {
      return;
    }

    recursive(node.left);
    recursive(node.right);

    if (ancestor_p === ancestor_q) {
      return;
    }

    if (node === p) {
      ancestor_p = node;
    }
    if (node === q) {
      ancestor_q = node;
    }

    if (node.left === ancestor_p || node.right === ancestor_p) {
      ancestor_p = node;
    }
    if (node.left === ancestor_q || node.right === ancestor_q) {
      ancestor_q = node;
    }
  };

  recursive(root);
  return ancestor_p;
}

// Recursion, but using the properties of a binary search tree
// Time complexity: O(H), H - height of the tree
// Space complexity: O(H), H - height of the tree
export function lowestCommonAncestor1(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  function recursive(node: TreeNode | null): TreeNode | null {
    if (!node) {
      return null;
    }
    if (p!.val < node.val && q!.val < node.val) {
      return recursive(node.left);
    } else if (p!.val > node.val && q!.val > node.val) {
      return recursive(node.right);
    } else {
      return node;
    }
  }

  return recursive(root);
}
