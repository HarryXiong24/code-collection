// 323. Number of Connected Components in an Undirected Graph

// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

// Return the number of connected components in the graph.

// Example 1:
// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2

// Example 2:
// Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
// Output: 1

class QuickUnion {
  root: number[];
  rank: number[];
  count: number;

  constructor(n: number) {
    this.root = new Array(n).fill(0).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.count = n;
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
    }
  }

  isConnected(x: number, y: number) {
    return this.root[x] === this.root[y];
  }

  getRootCount() {
    return this.count;
  }
}

export function countComponents(n: number, edges: number[][]): number {
  const quickUnion = new QuickUnion(n);

  for (let i = 0; i < edges.length; i++) {
    const [x, y] = edges[i];
    quickUnion.union(x, y);
  }

  return quickUnion.getRootCount();
}

// test
const res = countComponents(5, [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
]);
console.log(res);
