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

function detectCycle(edges: number[][], removedEdgeIndex: number): boolean {
  const uf = new DisjointSet(edges.length + 1);

  for (let i = 0; i < edges.length; i++) {
    if (i === removedEdgeIndex) {
      continue;
    }

    if (uf.isConnected(edges[i][0], edges[i][1])) {
      // there is a cycle, it must not be a tree.
      return true;
    } else {
      uf.union(edges[i][0], edges[i][1]);
    }
  }
  return false;
}

export function findRedundantDirectedConnection(edges: number[][]): number[] {
  // there are only 2 cases.
  // one is that there is a edge whose in-degree is 2. So we just need to determine which imn-degree edge should be removed.
  // the other is that the graph has cycle, so that we should detect cycle and then remove it.

  // handle case 1
  const inDegree: Map<number, number> = new Map();
  let inDegreeIsTwoVertex = -1;
  const inDegreeIsTwo: number[] = [];

  for (const edge of edges) {
    const [_, v] = edge;

    inDegree.set(v, (inDegree.get(v) || 0) + 1);

    if (inDegree.get(v)! === 2) {
      inDegreeIsTwoVertex = v;
    }
  }

  if (inDegreeIsTwoVertex !== -1) {
    for (let i = 0; i < edges.length; i++) {
      if (edges[i][1] === inDegreeIsTwoVertex) {
        inDegreeIsTwo.push(i);
      }
    }

    const [first, last] = inDegreeIsTwo;
    if (!detectCycle(edges, last)) {
      return edges[last];
    } else {
      return edges[first];
    }
  }

  // handle case 2
  for (let i = edges.length - 1; i >= 0; i--) {
    if (!detectCycle(edges, i)) {
      return edges[i];
    }
  }

  return [];
}

// test
const res = findRedundantDirectedConnection([
  [1, 2],
  [1, 3],
  [2, 3],
]);
console.log(res);
