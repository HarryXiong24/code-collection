type Graph = Record<string, string[]>;

export function shortestPathBetweenTwoVertices(graph: Graph, start: string, end: string): string[] {
  const queue: [string, string[]][] = [[start, [start]]];

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [current_vertex, path] = queue.shift()!;

      if (current_vertex === end) {
        return path;
      }

      for (const neighbor of graph[current_vertex]) {
        if (!path.includes(neighbor)) {
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
  }

  return [];
}

// test
const graph = {
  A: ['B', 'C', 'D'],
  B: ['A', 'E', 'F'],
  D: ['A', 'E'],
  C: ['A', 'E'],
  E: ['B', 'C', 'D', 'F'],
  F: ['B', 'E'],
};
const res = shortestPathBetweenTwoVertices(graph, 'A', 'F');
console.log(res);
