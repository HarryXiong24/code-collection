// 261. Graph Valid Tree

// You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

// Return true if the edges of the given graph make up a valid tree, and false otherwise.

// Example 1:
// Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
// Output: true

// Example 2:
// Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
// Output: false

class QuickUnion {
  root: number[];
  rank: number[];
  count: number;
  isCycle: boolean;

  constructor(n: number) {
    this.root = new Array(n).fill(0).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.count = n;
    this.isCycle = false;
  }

  find(x: number) {
    if (x === this.root[x]) {
      return x;
    }
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
  }

  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
      this.count--;
    } else {
      this.isCycle = true;
    }
  }

  isConnected(x: number, y: number) {
    return this.root[x] === this.root[y];
  }

  getCount() {
    return this.count;
  }

  getIsTree() {
    return !this.isCycle && this.count == 1;
  }
}

export function validTree(n: number, edges: number[][]): boolean {
  const quickUnion = new QuickUnion(n);

  for (let i = 0; i < edges.length; i++) {
    const [x, y] = edges[i];
    quickUnion.union(x, y);
  }

  return quickUnion.getIsTree();
}

// test
const res = validTree(5, [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 3],
  [1, 4],
]);
console.log(res);
