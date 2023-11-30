type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

export function dijkstra(graph: Graph, start: string) {
  const distances = Object.keys(graph).reduce((acc, node) => {
    acc[node] = Infinity;
    return acc;
  }, {} as EdgeMap);
  distances[start] = 0;
  const queue: [number, string][] = [[0, start]];

  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [current_distance, current_node] = queue.shift()!;

    if (current_distance > distances[current_node]) {
      continue;
    }

    const edge = graph[current_node];
    for (const neighbor of Object.keys(edge)) {
      const weight = edge[neighbor];

      if (weight + current_distance < distances[neighbor]) {
        distances[neighbor] = weight + current_distance;
        queue.push([weight + current_distance, neighbor]);
      }
    }
  }

  return distances;
}

// test
const graph = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};
const res = dijkstra(graph, 'A');
console.log(res);
