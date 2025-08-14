type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

export function dijkstra(graph: Graph, start: string, end: string): [string[], number] {
  const nodes = Object.keys(graph);

  const distanceMap: Map<string, number> = new Map();
  const predecessorMap: Map<string, string | null> = new Map();

  // init
  for (const node of nodes) {
    distanceMap.set(node, Infinity);
    predecessorMap.set(node, null);
  }

  const queue: [string, number][] = [[start, 0]];
  const visited: Set<string> = new Set();
  distanceMap.set(start, 0);

  while (queue.length) {
    queue.sort((a, b) => a[1] - b[1]);

    const [current_node, current_cost] = queue.shift()!;
    if (visited.has(current_node)) {
      continue;
    }
    visited.add(current_node);

    const neighbors = Object.keys(graph[current_node] ?? {});
    for (const neighbor of neighbors) {
      const weight = graph[current_node][neighbor];
      if (current_cost + weight < distanceMap.get(neighbor)!) {
        distanceMap.set(neighbor, current_cost + weight);
        queue.push([neighbor, current_cost + weight]);
        predecessorMap.set(neighbor, current_node);
      }
    }
  }

  // cannot arrive at the end
  if (distanceMap.get(end)! === Infinity) {
    return [[], Infinity];
  }
  const shortestPath: string[] = [];
  const getShortestPath = (node: string) => {
    if (!node) {
      return;
    }
    shortestPath.push(node);
    getShortestPath(predecessorMap.get(node)!);
  };

  getShortestPath(end);

  return [shortestPath.reverse(), distanceMap.get(end)!];
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
