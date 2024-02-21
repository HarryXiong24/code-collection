// Time Complexity	O(α(N))

// Note:
// N is the number of vertices in the graph.
// α refers to the Inverse Ackermann function.
// In practice, we assume it's a constant. In other words, O(α(N)) is regarded as O(1) on average.

// Space Complexity O(N)
export class UnionFind {
  root: number[];

  constructor(size: number) {
    this.root = new Array(size).fill(0).map((_, i) => i);
  }

  find(x: number): number {
    if (this.root[x] === x) {
      return x;
    }
    return this.find(this.root[x]);
  }

  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.root[rootY] = rootX;
    }
  }

  connected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }
}

// test
const unionFind = new UnionFind(10);
unionFind.union(1, 2);
unionFind.union(2, 3);
unionFind.union(4, 5);
unionFind.union(6, 7);
unionFind.union(8, 9);
unionFind.union(1, 9);
console.log(unionFind.connected(1, 9));
console.log(unionFind.connected(3, 9));
console.log(unionFind.connected(1, 4));
console.log(unionFind.connected(8, 4));
console.log(unionFind.connected(4, 5));
console.log(unionFind.connected(5, 6));
console.log(unionFind.connected(6, 7));
