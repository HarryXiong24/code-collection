// Binary Search Tree

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

class BinarySearchTree {
  root: TreeNode | null;

  constructor(node: TreeNode | null) {
    this.root = node;
  }

  searchNode(value: number) {
    const recursive = (node: TreeNode | null): boolean => {
      if (!node) {
        return false;
      }

      if (value < node.val) {
        return recursive(node.left);
      } else if (value > node.val) {
        return recursive(node.right);
      } else {
        return true;
      }
    };

    return recursive(this.root);
  }

  insertNode(new_value: number): boolean {
    if (!this.root) {
      this.root = new TreeNode(new_value);
      return true;
    }

    const recursive = (node: TreeNode): boolean => {
      if (new_value < node.val) {
        if (!node.left) {
          node.left = new TreeNode(new_value);
          return true;
        }
        return recursive(node.left);
      } else if (new_value > node.val) {
        if (!node.right) {
          node.right = new TreeNode(new_value);
          return true;
        }
        return recursive(node.right);
      } else {
        return false;
      }
    };

    return recursive(this.root);
  }

  deleteNode(value: number): boolean {
    if (!this.root) {
      return false;
    }

    const recursive = (node: TreeNode | null, parent: TreeNode | null): boolean => {
      if (!node) {
        return false;
      }

      if (value < node.val) {
        return recursive(node.left, node);
      } else if (value > node.val) {
        return recursive(node.right, node);
      } else {
        if (!node.left || !node.right) {
          const new_child = node.left ? node.left : node.right;
          if (parent === null) {
            this.root = new_child;
          } else if (parent.left === node) {
            parent.left = new_child;
          } else {
            parent.right = new_child;
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

    return recursive(this.root, null);
  }

  preorder() {
    const res: number[] = [];

    const recursive = (node: TreeNode | null) => {
      if (!node) {
        return;
      }

      res.push(node.val);
      recursive(node.left);
      recursive(node.right);
    };

    recursive(this.root);
    return res;
  }

  inorder() {
    const res: number[] = [];

    const recursive = (node: TreeNode | null) => {
      if (!node) {
        return;
      }

      recursive(node.left);
      res.push(node.val);
      recursive(node.right);
    };

    recursive(this.root);
    return res;
  }

  postorder() {
    const res: number[] = [];

    const recursive = (node: TreeNode | null) => {
      if (!node) {
        return;
      }

      recursive(node.left);
      recursive(node.right);
      res.push(node.val);
    };

    recursive(this.root);
    return res;
  }
}

// test
const tree = new BinarySearchTree(null);
tree.insertNode(8);
tree.insertNode(14);
tree.insertNode(10);
tree.insertNode(13);
tree.insertNode(3);
tree.insertNode(1);
tree.insertNode(6);
tree.insertNode(4);
tree.insertNode(7);
const insert_res1 = tree.preorder();
console.log(insert_res1);
const search_res1 = tree.searchNode(14);
console.log(search_res1);
const search_res2 = tree.searchNode(5);
console.log(search_res2);

tree.deleteNode(8);
const delete_res1 = tree.preorder();
console.log(delete_res1);

tree.deleteNode(3);
const delete_res2 = tree.preorder();
console.log(delete_res2);
