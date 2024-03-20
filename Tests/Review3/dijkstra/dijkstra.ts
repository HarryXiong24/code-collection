type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

export function dijkstra(graph: Graph, start: string, end: string): [string[], number] {
  const dijkstra_table = Object.keys(graph).reduce((obj, attr) => {
    obj[attr] = Infinity;
    return obj;
  }, {} as EdgeMap);
  const path_record = Object.keys(graph).reduce((obj, attr) => {
    obj[attr] = null;
    return obj;
  }, {} as Record<string, string | null>);

  // init
  const visited = new Set();
  const queue: [string, number][] = [[start, 0]];
  dijkstra_table[start] = 0;

  while (queue.length) {
    const [current_node, current_cost] = queue.shift()!;

    if (visited.has(current_node)) {
      continue;
    }
    visited.add(current_node);

    const neighbors = graph[current_node];
    for (const neighbor of Object.keys(neighbors)) {
      const weight = graph[current_node][neighbor];

      if (current_cost + weight < dijkstra_table[neighbor]) {
        dijkstra_table[neighbor] = current_cost + weight;
        path_record[neighbor] = current_node;
        queue.push([neighbor, current_cost + weight]);
      }
    }
  }

  const getShortestPath = (node: string | null, result: string[]) => {
    if (!node) {
      return;
    }
    result.push(node);
    getShortestPath(path_record[node], result);
  };

  const shortest_path: string[] = [];

  getShortestPath(end, shortest_path);

  return [shortest_path.reverse(), dijkstra_table[end]];
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
