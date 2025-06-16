// 题目描述

// 有一个图，它是一棵树，他是拥有 n 个节点（节点编号1到n）和 n - 1 条边的连通无环无向图（其实就是一个线形图），如图：

// 现在在这棵树上的基础上，添加一条边（依然是n个节点，但有n条边），使这个图变成了有环图，如图

// 先请你找出冗余边，删除后，使该图可以重新变成一棵树。

// 输入描述

// 第一行包含一个整数 N，表示图的节点个数和边的个数。

// 后续 N 行，每行包含两个整数 s 和 t，表示图中 s 和 t 之间有一条边。

// 输出描述

// 输出一条可以删除的边。如果有多个答案，请删除标准输入中最后出现的那条边。

// 输入示例

// 3
// 1 2
// 2 3
// 1 3

// 输出示例

// 1 3

class DisjointSet {
  root: number[];

  constructor(n: number) {
    this.root = new Array(n).fill(0).map((_, i: number) => i);
  }

  find(x: number): number {
    if (this.root[x] === x) {
      return x;
    }
    return this.find(this.root[x]);
  }

  union(x: number, y: number) {
    const root_x = this.find(x);
    const root_y = this.find(y);

    if (root_x != root_y) {
      this.root[root_y] = root_x;
    }
  }

  isConnected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }
}

export function redundantConnections(nums: number[][]): number[] {
  const uf = new DisjointSet(nums.length);

  for (const item of nums) {
    if (uf.isConnected(item[0], item[1])) {
      return item;
    }
    uf.union(item[0], item[1]);
  }

  return [];
}

// test
const res = redundantConnections([
  [1, 2],
  [2, 3],
  [1, 3],
]);
console.log(res);
const res1 = redundantConnections([
  [1, 4],
  [4, 2],
  [2, 3],
  [3, 5],
  [2, 5],
]);
console.log(res1);
