class QuickUnion {
  root: number[];
  rank: number[];

  constructor(size: number) {
    this.root = new Array(size).fill(0).map((_, i) => i);
    this.rank = new Array(size).fill(1);
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
    }
  }

  isConnected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }
}

// Prim's algorithm depends on the vertices of the graph, whereas Kruskal's algorithm depends on the edges.
// For a graph with relatively fewer edges (sparse graph), Kruskal's algorithm might be a better choice
// For a graph with many edges (dense graph), Prim's algorithm might be more efficient.

// O(E log E), E is # of edges
export function kruskal(edges: number[][], points: number): [number, number[][]] {
  const quickUnion = new QuickUnion(points);
  let count = points - 1;
  let res = 0;
  const mst: number[][] = [];

  edges.sort((a, b) => a[2] - b[2]);

  while (edges.length && count > 0) {
    const current = edges.shift()!;
    if (!quickUnion.isConnected(current[0], current[1])) {
      res = res + current[2];
      quickUnion.union(current[0], current[1]);
      mst.push([current[0], current[1]]);
      count--;
    }
  }

  return [res, mst];
}

// test
const res = kruskal(
  [
    [0, 1, 4],
    [0, 2, 13],
    [0, 3, 7],
    [0, 4, 7],
    [1, 2, 9],
    [1, 3, 3],
    [1, 4, 7],
    [2, 3, 10],
    [2, 4, 14],
    [3, 4, 4],
  ],
  5
);
console.log(res);
