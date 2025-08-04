// 685. Redundant Connection II

// In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

// The given input is a directed graph that started as a rooted tree with n nodes (with distinct values from 1 to n), with one additional directed edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.

// The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [ui, vi] that represents a directed edge connecting nodes ui and vi, where ui is a parent of child vi.

// Return an edge that can be removed so that the resulting graph is a rooted tree of n nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array.

// Example 1:
// Input: edges = [[1,2],[1,3],[2,3]]
// Output: [2,3]

// Example 2:
// Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
// Output: [4,1]

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

export function findRedundantDirectedConnection(edges: number[][]): number[] {}

// test
const res = findRedundantDirectedConnection([
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 1],
  [1, 5],
]);
console.log(res);
