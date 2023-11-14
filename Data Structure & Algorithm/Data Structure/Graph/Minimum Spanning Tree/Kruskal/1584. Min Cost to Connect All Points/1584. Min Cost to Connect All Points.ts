// 1584. Min Cost to Connect All Points

// You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

// Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

// Example 1:
// Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
// Output: 20
// Explanation:
// We can connect the points as shown above to get the minimum cost of 20.
// Notice that there is a unique path between every pair of points.

// Example 2:
// Input: points = [[3,12],[-2,5],[-4,1]]
// Output: 18

type Edge = [number, number, number];

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

export function minCostConnectPoints(points: number[][]): number {
  const arr: Edge[] = [];
  const quickUnion = new QuickUnion(points.length);

  if (points.length === 0) {
    return 0;
  }

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];
      const weight = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      const edge: Edge = [i, j, weight];
      arr.push(edge);
    }
  }

  arr.sort((a, b) => a[2] - b[2]);

  let count = points.length - 1;
  let res = 0;
  while (arr.length && count > 0) {
    const current = arr.shift()!;
    if (!quickUnion.isConnected(current[0], current[1])) {
      res = res + current[2];
      quickUnion.union(current[0], current[1]);
      count--;
    }
  }

  return res;
}

// test
const res = minCostConnectPoints([
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
]);
console.log(res);
