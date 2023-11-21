// 1059. All Paths from Source Lead to Destination

// Given the edges of a directed graph where edges[i] = [ai, bi] indicates there is an edge between nodes ai and bi, and two nodes source and destination of this graph, determine whether or not all paths starting from source eventually, end at destination, that is:

// At least one path exists from the source node to the destination node
// If a path exists from the source node to a node with no outgoing edges, then that node is equal to destination.
// The number of possible paths from source to destination is a finite number.
// Return true if and only if all roads from source lead to destination.

// Example 1:
// Input: n = 3, edges = [[0,1],[0,2]], source = 0, destination = 2
// Output: false
// Explanation: It is possible to reach and get stuck on both node 1 and node 2.

// Example 2:
// Input: n = 4, edges = [[0,1],[0,3],[1,2],[2,1]], source = 0, destination = 3
// Output: false
// Explanation: We have two possibilities: to end at node 3, or to loop over node 1 and node 2 indefinitely.

// Example 3:
// Input: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]], source = 0, destination = 3
// Output: true

enum Solution {
  GRAY = 1,
  BLACK = 2,
}

export function leadsToDestination(n: number, edges: number[][], source: number, destination: number): boolean {
  const graph: Map<number, number[]> = new Map();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (const [from, to] of edges) {
    graph.get(from)!.push(to);
  }

  const leadsToDest = (
    graph: Map<number, number[]>,
    node: number,
    dest: number,
    states: (number | null)[]
  ): boolean => {
    if (states[node] !== null) {
      return states[node] === Solution.BLACK;
    }

    if (graph.has(node) && graph.get(node)!.length === 0) {
      return node === dest;
    }

    states[node] = Solution.GRAY;

    if (graph.has(node)) {
      const current = graph.get(node)!;
      for (const nextNode of current) {
        if (!leadsToDest(graph, nextNode, dest, states)) {
          return false;
        }
      }
    }

    states[node] = Solution.BLACK;
    return true;
  };

  return leadsToDest(graph, source, destination, new Array<number | null>(n).fill(null));
}

// test
const res = leadsToDestination(
  4,
  [
    [0, 1],
    [0, 3],
    [1, 2],
    [2, 1],
  ],
  0,
  3
);
console.log(res);
