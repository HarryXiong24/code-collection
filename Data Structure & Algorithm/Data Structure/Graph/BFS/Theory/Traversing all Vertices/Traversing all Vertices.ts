type Graph = Record<string, string[]>;

export function traverseVertices_BFS(graph: Graph, start: string): string[] {
  const queue: string[] = [start];
  const isVisited: Set<string> = new Set(start);
  const results: string[] = [];

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;

      results.push(current);

      for (const neighbor of graph[current]) {
        if (!isVisited.has(neighbor)) {
          queue.push(neighbor);
          isVisited.add(neighbor);
        }
      }
    }
  }

  return results;
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
const res = traverseVertices_BFS(graph, 'A');
console.log(res);
