// 785. Is Graph Bipartite?

// There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], there is an undirected edge between node u and node v. The graph has the following properties:

// There are no self-edges (graph[u] does not contain u).
// There are no parallel edges (graph[u] does not contain duplicate values).
// If v is in graph[u], then u is in graph[v] (the graph is undirected).
// The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them.
// A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.

// Return true if and only if it is bipartite.

// Example 1:
// Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
// Output: false
// Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.

// Example 2:
// Input: graph = [[1,3],[0,2],[1,3],[0,2]]
// Output: true
// Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.

export function isBipartite(graph: number[][]): boolean {
  const visited = new Map<number, boolean>();

  const recursion = (node: number, color: boolean): boolean => {
    const neighbors = graph[node];
    visited.set(node, color);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (!recursion(neighbor, !color)) {
          return false;
        }
      } else {
        const neighbor_color = visited.get(neighbor)!;
        if (neighbor_color === color) {
          return false;
        }
      }
    }

    return true;
  };

  for (let i = 0; i < graph.length; i++) {
    if (!visited.has(i)) {
      if (!recursion(i, true)) {
        return false;
      }
    }
  }

  return true;
}

export function isBipartiteBFS(graph: number[][]): boolean {
  const visited = new Map<number, boolean>();

  const BFS = (node: number): boolean => {
    const queue: number[] = [];

    queue.push(node);
    visited.set(node, true);

    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const current = queue.shift()!;
        const current_color = visited.get(current)!;

        for (const neighbor of graph[current]) {
          if (visited.has(neighbor)) {
            if (visited.get(neighbor)! === current_color) {
              return false;
            }
            continue;
          }
          queue.push(neighbor);
          visited.set(neighbor, !current_color);
        }
      }
    }

    return true;
  };

  for (let i = 0; i < graph.length; i++) {
    if (!visited.has(i)) {
      if (!BFS(i)) {
        return false;
      }
    }
  }

  return true;
}

// test
const res = isBipartite([
  [1, 2, 3],
  [0, 2],
  [0, 1, 3],
  [0, 2],
]);
console.log(res);
