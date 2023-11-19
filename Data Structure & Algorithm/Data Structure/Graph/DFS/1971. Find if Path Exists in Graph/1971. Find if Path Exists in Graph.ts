// 1971. Find if Path Exists in Graph

// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

// You want to determine if there is a valid path that exists from vertex source to vertex destination.

// Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

// Example 1:
// Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
// Output: true
// Explanation: There are two paths from vertex 0 to vertex 2:
// - 0 → 1 → 2
// - 0 → 2

// Example 2:
// Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
// Output: false
// Explanation: There is no path from vertex 0 to vertex 5.

export function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  const isVisited = new Array(n).fill(false);
  const adjacent_list: Map<number, number[]> = new Map();

  if (source === destination) {
    return true;
  }

  for (const item of edges) {
    const [a, b] = item;
    if (!adjacent_list.has(a)) {
      adjacent_list.set(a, [b]);
    }
    adjacent_list.get(a)!.includes(b) === false && adjacent_list.get(a)!.push(b);
    if (!adjacent_list.has(b)) {
      adjacent_list.set(b, [a]);
    }
    adjacent_list.get(b)!.includes(a) === false && adjacent_list.get(b)!.push(a);
  }

  const stack: number[] = [source];
  while (stack.length) {
    const current = stack.pop()!;
    if (!isVisited[current]) {
      const next = adjacent_list.get(current)!;
      stack.push(...next);
      isVisited[current] = true;
    }
    if (isVisited[destination]) {
      return true;
    }
  }

  return false;
}

// text
const res = validPath(
  3,
  [
    [0, 1],
    [1, 2],
    [2, 0],
  ],
  0,
  2
);
console.log(res);
