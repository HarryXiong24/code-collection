// 572. Subtree of Another Tree

// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

// Example 1:
// Input: root = [3,4,5,1,2], subRoot = [4,1,2]
// Output: true

// Example 2:
// Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
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

// Recursive
// Time Complexity: O(N)
// Space Complexity: O(N)
export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  const isSameTree = (node: TreeNode | null, sub_node: TreeNode | null): boolean => {
    if (!node && !sub_node) {
      return true;
    } else if (!node && sub_node) {
      return false;
    } else if (node && !sub_node) {
      return false;
    } else {
      if (node!.val === sub_node!.val) {
        return isSameTree(node!.left, sub_node!.left) && isSameTree(node!.right, sub_node!.right);
      } else {
        return false;
      }
    }
  };

  const recursive = (node: TreeNode | null, sub_node: TreeNode | null): boolean => {
    if (!node && !sub_node) {
      return true;
    } else if (!node && sub_node) {
      return false;
    } else if (node && !sub_node) {
      return false;
    } else {
      if (isSameTree(node, sub_node)) {
        return true;
      } else {
        return recursive(node!.left, subRoot) || recursive(node!.right, subRoot);
      }
    }
  };

  return recursive(root, subRoot);
}

// String Match
// Time Complexity: O(M + N)
// Space Complexity: O(M + N)
export function isSubtree1(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  const printTree = (node: TreeNode | null, log: string[]) => {
    if (!node) {
      log.push('#');
      return;
    }
    log.push(`,${node.val},`);
    printTree(node.left, log);
    printTree(node.right, log);
  };

  let root_log: string[] = [];
  let sub_root_log: string[] = [];

  printTree(root, root_log);
  printTree(subRoot, sub_root_log);

  return root_log.join('').includes(sub_root_log.join(''));
}
