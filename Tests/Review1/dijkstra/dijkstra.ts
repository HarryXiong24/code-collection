type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

function dijkstra(graph: Graph, start: string, end: string): [string[], number] {
  const dijkstra_table = Object.keys(graph).reduce((obj, node) => {
    obj[node] = Infinity;
    return obj;
  }, {} as EdgeMap);
  const record_path = Object.keys(graph).reduce((obj, node) => {
    obj[node] = null;
    return obj;
  }, {} as Record<string, string | null>);

  const visited = new Set<string>();

  // init
  dijkstra_table[start] = 0;
  const queue: [string, number][] = [[start, 0]];

  while (queue.length) {
    const [current_node, current_cost] = queue.shift()!;

    if (visited.has(current_node)) {
      continue;
    }
    visited.add(current_node);

    for (const neighbor in graph[current_node]) {
      const weight = graph[current_node][neighbor];
      if (current_cost + weight < dijkstra_table[neighbor]) {
        dijkstra_table[neighbor] = current_cost + weight;
        record_path[neighbor] = current_node;
        queue.push([neighbor, current_cost + weight]);
      }
    }
  }

  const getShortestPath = (node: string | null, result: string[]) => {
    if (!node) {
      return;
    }
    result.unshift(node);
    getShortestPath(record_path[node], result);
  };

  const shortest_path: string[] = [];
  getShortestPath(end, shortest_path);

  return [shortest_path, dijkstra_table[end]];
}

// test
const graph = {
  A: { B: 1, C: 1, D: 3 },
  B: { A: 1, D: 2, E: 1 },
  C: { A: 1, D: 1 },
  D: { A: 2, B: 3, C: 1, E: 2 },
  E: { B: 1, D: 2 },
};
const [result, cost] = dijkstra(graph, 'A', 'E');
console.log(result, cost);
