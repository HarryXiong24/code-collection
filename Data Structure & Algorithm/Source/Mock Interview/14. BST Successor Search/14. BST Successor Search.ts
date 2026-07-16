// 14. BST Successor Search

// In a Binary Search Tree (BST), an Inorder Successor of a node is defined as the node with the smallest key greater than the key of the input node (see examples below). Given a node inputNode in a BST, you’re asked to write a function findInOrderSuccessor that returns the Inorder Successor of inputNode. If inputNode has no Inorder Successor, return null.

// Explain your solution and analyze its time and space complexities.

// Binary tree

// In this diagram, the inorder successor of 9 is 11 and the inorder successor of 14 is 20.

// Example:

// In the diagram above, for inputNode whose key = 11

// Your function would return:

// The Inorder Successor node whose key = 12

class TreeNode {
  key: number;
  parent: TreeNode | null;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(key: number) {
    this.key = key;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  findInOrderSuccessor(inputNode: TreeNode): TreeNode | null {
    if (inputNode.right != null) {
      // if node has a right child -> leftmost of it or right
      let node = inputNode.right;
      while (node.left != null) {
        node = node.left;
      }
      return node;
    } else {
      // otherwise we go up, iterating through the parent, until we find bigger paretn
      let node: TreeNode | null = inputNode.parent;
      while (node && node.key < inputNode.key) {
        node = node.parent;
      }

      if (node != null) {
        return node;
      }

      return null;
    }
  }

  insert(key: number) {
    const root = this.root;

    // 1. If the tree is empty, create the root
    if (!root) {
      this.root = new TreeNode(key);
      return;
    }

    // 2) Otherwise, create a node with the key
    //    and traverse down the tree to find where to
    //    to insert it
    let currentNode = root;
    const newNode = new TreeNode(key);

    while (currentNode !== null) {
      if (key < currentNode.key) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          newNode.parent = currentNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          newNode.parent = currentNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  getNodeByKey(key: number) {
    let currentNode = this.root;

    while (currentNode) {
      if (key === currentNode.key) {
        return currentNode;
      }

      if (key < currentNode.key) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }
}

/*********************************************
 * Driver program to test above function     *
 *********************************************/

// Create a Binary Search Tree
const bst = new BinarySearchTree();
bst.insert(20);
bst.insert(9);
bst.insert(25);
bst.insert(5);
bst.insert(12);
bst.insert(11);
bst.insert(14);

// Get a reference to the node whose key is 9
const test = bst.getNodeByKey(20);

// Find the in order successor of test
const succ = test ? bst.findInOrderSuccessor(test) : null;

// Print the key of the successor node
if (succ) {
  console.log('Inorder successor of ' + test!.key + ' is ' + succ.key);
} else {
  console.log('Inorder successor does not exist');
}
