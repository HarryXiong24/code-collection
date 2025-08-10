// 684. Redundant Connection

// In this problem, a tree is an undirected graph that is connected and has no cycles.

// You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

// Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

// Example 1:
// Input: edges = [[1,2],[1,3],[2,3]]
// Output: [2,3]

// Example 2:
// Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
// Output: [1,4]

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

export function findRedundantConnection(edges: number[][]): number[] {
  const disjointSet = new DisjointSet(edges.length);

  for (const edge of edges) {
    const [u, v] = edge;
    if (!disjointSet.isConnected(u, v)) {
      disjointSet.union(u, v);
    } else {
      return edge;
    }
  }

  return [];
}

// test
const res = findRedundantConnection([
  [1, 2],
  [1, 3],
  [2, 3],
]);
console.log(res);
const res1 = findRedundantConnection([
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 4],
  [1, 5],
]);
console.log(res1);
