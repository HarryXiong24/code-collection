type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

export function dijkstra(graph: Graph, start: string, end: string): [string[], number] {
  const dijkstra_table = Object.keys(graph).reduce((obj, attr) => {
    obj[attr] = Infinity;
    return obj;
  }, {} as EdgeMap);
  const record_path = Object.keys(graph).reduce((obj, attr) => {
    obj[attr] = null;
    return obj;
  }, {} as Record<string, string | null>);

  // init
  dijkstra_table[start] = 0;
  const queue: [string, number][] = [[start, 0]];
  const visited = new Set();

  while (queue.length) {
    queue.sort((a, b) => a[1] - b[1]);

    const [current_node, current_cost] = queue.shift()!;

    if (visited.has(current_node)) {
      continue;
    }
    visited.add(current_node);

    const neighbors = Object.keys(graph[current_node]);
    for (const neighbor of neighbors) {
      const weight = graph[current_node][neighbor];
      if (current_cost + weight < dijkstra_table[neighbor]) {
        dijkstra_table[neighbor] = current_cost + weight;
        queue.push([neighbor, current_cost + weight]);
        record_path[neighbor] = current_node;
      }
    }
  }

  const getShortPath = (node: string | null, result: string[]) => {
    if (!node) {
      return;
    }
    result.push(node);
    getShortPath(record_path[node], result);
  };

  const shortest_path: string[] = [];
  getShortPath(end, shortest_path);

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
