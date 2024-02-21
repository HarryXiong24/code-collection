class TreeNode<T> {
  public height: number;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(public value: T) {
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

export class AVLTree<T> {
  private root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // 插入新节点
  public insert(value: T): void {
    this.root = this.insertAtNode(this.root, value);
  }

  // 在特定节点处插入新值
  private insertAtNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertAtNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertAtNode(node.right, value);
    } else {
      return node; // 重复值不插入
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // 平衡因子
    let balanceFactor = this.getBalanceFactor(node);

    // 左左情况
    if (balanceFactor > 1 && value < node.left!.value) {
      return this.rightRotate(node);
    }

    // 右右情况
    if (balanceFactor < -1 && value > node.right!.value) {
      return this.leftRotate(node);
    }

    // 左右情况
    if (balanceFactor > 1 && value > node.left!.value) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // 右左情况
    if (balanceFactor < -1 && value < node.right!.value) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  // 右旋转
  private rightRotate(y: TreeNode<T>): TreeNode<T> {
    let x = y.left!;
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // 左旋转
  private leftRotate(x: TreeNode<T>): TreeNode<T> {
    let y = x.right!;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  // 获取节点高度
  private getHeight(node: TreeNode<T> | null): number {
    if (!node) {
      return 0;
    }

    return node.height;
  }

  // 计算平衡因子
  private getBalanceFactor(node: TreeNode<T>): number {
    if (!node) {
      return 0;
    }

    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // 删除节点
  public delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) {
      return node;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // 节点有一个子节点或没有子节点
      if (node.left === null || node.right === null) {
        let temp = node.left ? node.left : node.right;

        if (temp === null) {
          temp = node;
          node = null;
        } else {
          node = temp;
        }
      } else {
        // 有两个子节点的情况
        let temp = this.getMinValueNode(node.right!);
        node.value = temp.value;
        node.right = this.deleteNode(node.right, temp.value);
      }
    }

    if (node === null) {
      return node;
    }

    // 更新高度
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // 平衡树
    let balanceFactor = this.getBalanceFactor(node);

    // 左左情况
    if (balanceFactor > 1 && this.getBalanceFactor(node.left!) >= 0) {
      return this.rightRotate(node);
    }

    // 左右情况
    if (balanceFactor > 1 && this.getBalanceFactor(node.left!) < 0) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // 右右情况
    if (balanceFactor < -1 && this.getBalanceFactor(node.right!) <= 0) {
      return this.leftRotate(node);
    }

    // 右左情况
    if (balanceFactor < -1 && this.getBalanceFactor(node.right!) > 0) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  // 找到树中最小值的节点
  private getMinValueNode(node: TreeNode<T>): TreeNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // 前序遍历
  public preOrderTraversal(): void {
    this.preOrderHelper(this.root);
  }

  private preOrderHelper(node: TreeNode<T> | null): void {
    if (node !== null) {
      console.log(node.value);
      this.preOrderHelper(node.left);
      this.preOrderHelper(node.right);
    }
  }

  // 中序遍历
  public inOrderTraversal(): void {
    this.inOrderHelper(this.root);
  }

  private inOrderHelper(node: TreeNode<T> | null): void {
    if (node !== null) {
      this.inOrderHelper(node.left);
      console.log(node.value);
      this.inOrderHelper(node.right);
    }
  }

  // 后序遍历
  public postOrderTraversal(): void {
    this.postOrderHelper(this.root);
  }

  private postOrderHelper(node: TreeNode<T> | null): void {
    if (node !== null) {
      this.postOrderHelper(node.left);
      this.postOrderHelper(node.right);
      console.log(node.value);
    }
  }
}
