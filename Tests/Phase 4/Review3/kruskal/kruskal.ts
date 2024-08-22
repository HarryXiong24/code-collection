class UnionFind {
  root: number[];

  constructor(size: number) {
    this.root = new Array(size).fill(0).map((_, index) => index);
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
    if (root_x !== root_y) {
      this.root[root_y] = root_x;
    }
  }

  connected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }
}

function kruskal(graph: number[][], vertices: number): [number, number[][]] {
  let cost = 0;
  const mst: number[][] = [];

  const uf = new UnionFind(vertices);
  let count = vertices - 1;

  graph.sort((a, b) => a[2] - b[2]);

  while (count > 0) {
    const [v, w, weight] = graph.shift()!;

    if (!uf.connected(v, w)) {
      mst.push([v, w]);
      cost += weight;
      count--;
      uf.union(v, w);
    }
  }

  return [cost, mst];
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
