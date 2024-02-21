// 二叉搜索树（Binary Search Tree）

/**
 * 特征
 * 1.首先它是一个树
 * 2.每个节点最多有两个子节点
 * 3.左侧子节点 < 本节点 < 右侧子节点有序排列，便于搜索
 */

/**
 * 功能
 * 1.向树中插入一个新的节点
 * 2.在树中查找一个键，存在返回 true；不存在返回 false
 * 3.中序遍历所有节点
 * 4.先序遍历所有节点
 * 5.后序遍历所有节点
 * 6.返回树中最小的键的节点
 * 7.返回树中最大的键的节点
 * 8.从树中移除某个节点
 */

// 定义节点
class Node<T> {
  public key: T;
  public left: Node<T> | null;
  public right: Node<T> | null;

  constructor(key: T, left: Node<T> | null = null, right: Node<T> | null = null) {
    this.key = key;
    this.left = left;
    this.right = right;
  }

  toString() {
    return `${this.key}`;
  }
}

// 定义比较结果的枚举值
enum Compare {
  LESS_THAN = -1,
  MORE_THAN = 1,
  EQUALS = 0,
}

// 二叉搜索树
export class BinarySearchTree<T> {
  protected root: Node<T>;

  constructor(key: T) {
    this.root = new Node<T>(key);
  }

  // 默认的比较函数，因为二叉搜索树是有序排列的树，所以需要有个比较大小的方法
  compare<T>(a: T, b: T): Compare {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.MORE_THAN;
  }

  // 返回根节点
  getRoot(): Node<T> {
    return this.root;
  }

  // 返回指定子树下的最小元素
  protected minNode(node: Node<T>): Node<T> {
    let minNode: Node<T> = node;

    while (minNode !== null && minNode.left !== null) {
      minNode = minNode.left;
    }

    return minNode;
  }

  // 返回树中的最小元素
  min(): Node<T> {
    return this.minNode(this.root);
  }

  // 返回指定子树下的最大元素
  protected maxNode(node: Node<T>): Node<T> {
    let maxNode: Node<T> = node;

    while (maxNode !== null && maxNode.right !== null) {
      maxNode = maxNode.right;
    }

    return maxNode;
  }

  // 返回树中的最大元素
  max(): Node<T> {
    return this.maxNode(this.root);
  }

  // 前序遍历，回调 -> 左 -> 右
  // 指定节点的前序遍历
  protected preOrderTraverseNode(node: Node<T> | null, callback: Function): void {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  // 前序遍历
  preOrderTraverse(callback: Function) {
    // 调用前序遍历迭代方法
    this.preOrderTraverseNode(this.root, callback);
  }

  // 中序遍历，左 -> 回调 -> 右
  // 指定节点的中序遍历
  protected inOrderTraverseNode(node: Node<T> | null, callback: Function): void {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // 中序遍历
  inOrderTraverse(callback: Function) {
    // 调用中序遍历迭代方法
    this.inOrderTraverseNode(this.root, callback);
  }

  // 后序遍历，左 -> 右 -> 回调
  // 指定节点的后序遍历
  protected postOrderTraverseNode(node: Node<T> | null, callback: Function): void {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 后序遍历
  postOrderTraverse(callback: Function) {
    // 调用后序遍历迭代方法
    this.postOrderTraverseNode(this.root, callback);
  }

  // 查找值
  protected searchNode(node: Node<T> | null, key: T): boolean {
    if (node === null) {
      return false;
    }

    if (this.compare(key, node.key) === Compare.LESS_THAN) {
      // key 比 node.key 小，向左查
      return this.searchNode(node.left, key);
    } else if (this.compare(key, node.key) === Compare.MORE_THAN) {
      // key 比 node.key 大，向右查
      return this.searchNode(node.right, key);
    } else {
      // 找到了
      return true;
    }
  }

  search(key: T): boolean {
    return this.searchNode(this.root, key);
  }

  // 增加
  protected insertNode(node: Node<T>, key: T) {
    if (this.compare(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node<T>(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right === null) {
        node.right = new Node<T>(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  insert(key: T) {
    if (this.root === null) {
      // 边界情况：插入到根节点
      this.root = new Node<T>(key);
    } else {
      // 递归找到插入位置
      this.insertNode(this.root, key);
    }
  }

  // 删除节点
  protected removeNode(node: Node<T> | null, key: T): Node<T> | null {
    if (node === null) {
      return null;
    }

    if (this.compare(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left!, key);
      return node;
    } else if (this.compare(key, node.key) === Compare.MORE_THAN) {
      node.right = this.removeNode(node.right!, key);
      return node;
    } else {
      // 此时已经查到了要删除的节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        // 当要删除的节点只有一个子节点
        node = node.right;
        return node;
      } else if (node.right === null) {
        // 同样删除的节点只有一个子节点
        node = node.left;
        return node;
      } else {
        // 当要删除的节点有两个子节点
        const min = this.minNode(node.right);
        node.key = min.key;
        node.right = this.removeNode(node.right, min.key);
        return node;
      }
    }
  }

  // 删除节点
  remove(key: T) {
    if (this.root === null) {
      return;
    }
    const deleteNode = this.removeNode(this.root, key);
    return deleteNode;
  }
}

// test
const binarySearch = new BinarySearchTree<number>(0);
binarySearch.inOrderTraverse((value: number) => {
  console.log(value);
});
