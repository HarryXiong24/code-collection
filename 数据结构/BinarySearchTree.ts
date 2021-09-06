// 二叉搜索树

/*
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

  constructor(key: T, left: Node<T> | null = null, right?: Node<T> | null = null) {
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
export default class BinarySearchTree<T> {

  protected root: Node<T>;

  constructor(root: Node<T>) {
    this.root = root;
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

}