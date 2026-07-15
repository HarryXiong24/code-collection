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

function isTreeAfterRemoveEdge(edges: number[][], deleteEdge: number) {
  const uf = new DisjointSet(edges.length);

  for (let i = 0; i < edges.length; i++) {
    if (i === deleteEdge) {
      continue;
    }

    if (uf.isConnected(edges[i][0], edges[i][1])) {
      // 构成有向环了，一定不是树
      return false;
    } else {
      uf.union(edges[i][0], edges[i][1]);
    }
  }
  return true;
}

function getRemoveEdge(edges: number[][]): number[] {
  const uf = new DisjointSet(edges.length);

  for (let i = 0; i < edges.length; i++) {
    if (uf.isConnected(edges[i][0], edges[i][1])) {
      // 构成有向环了，就是要删除的边
      return edges[i];
    } else {
      uf.union(edges[i][0], edges[i][1]);
    }
  }
  return [];
}

export function findRedundantDirectedConnection(edges: number[][]): number[] {
  // 情况一: 如果我们找到入度为2的点，那么删一条指向该节点的边就行了
  // 情况二: 入度为 2 还有一种情况，只能删特定的一条边
  // 前两种入度为2的情况，一定是删除指向入度为2的节点的两条边其中的一条，如果删了一条，判断这个图是一个树，那么这条边就是答案
  const inDegree: number[] = Array(edges.length + 1).fill(0); // 入度数组，1-based

  for (let i = 0; i < edges.length; i++) {
    inDegree[edges[i][1]]++;
  }

  // 找入度为2的节点所对应的边，注意要倒序，因为优先删除最后出现的一条边
  const inDegree2: number[] = [];

  for (let i = edges.length - 1; i >= 0; i--) {
    if (inDegree[edges[i][1]] == 2) {
      inDegree2.push(i);
    }
  }

  if (inDegree2.length) {
    // 放在 inDegree2 里的边已经按照倒叙放的，所以这里就优先删 inDegree2[0] 这条边
    // 因为此时只会删除一条边，我们只需要判断 inDegree2[0] 删掉后还有没有环，如果有说明要删除的是另一条边
    if (isTreeAfterRemoveEdge(edges, inDegree2[0])) {
      // 放在 vec 里的边是倒序的，优先尝试删除 inDegree2[0
      return edges[inDegree2[0]];
    } else {
      return edges[inDegree2[1]];
    }
  }

  // 情况三: 如果没有入度为2的点，说明图中有环了（注意是有向环）
  return getRemoveEdge(edges);
}

// test
const res = findRedundantDirectedConnection([
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 1],
  [1, 5],
]);
console.log(res);
