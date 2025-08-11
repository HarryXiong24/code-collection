type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

export function dijkstra(graph: Graph, start: string, end: string): [string[], number] {
  const dijkstraMap: Map<string, number> = new Map();
  const shortestPathRecord: Map<string, string> = new Map();

  // init
  for (const item of Object.keys(graph)) {
    dijkstraMap.set(item, Infinity);
    shortestPathRecord.set(item, '');
  }

  const queue: [string, number][] = [[start, 0]];
  const visited: Set<string> = new Set();
  dijkstraMap.set(start, 0);

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
      if (current_cost + weight < dijkstraMap.get(neighbor)!) {
        dijkstraMap.set(neighbor, current_cost + weight);
        queue.push([neighbor, current_cost + weight]);
        shortestPathRecord.set(neighbor, current_node);
      }
    }
  }

  const shortestPath: string[] = [];

  const getShortestPath = (node: string) => {
    if (!node) {
      return;
    }
    shortestPath.push(node);
    getShortestPath(shortestPathRecord.get(node)!);
  };

  getShortestPath(end);

  return [shortestPath.reverse(), dijkstraMap.get(end)!];
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
