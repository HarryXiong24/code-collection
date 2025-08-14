type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

/**
 * SPFA (Queue-optimized Bellman–Ford) with Set-based in-queue tracking.
 */
export function bellmanFord(graph: Graph, start: string, end: string): [string[], number] {
  const nodes = Object.keys(graph);

  const distanceMap = new Map<string, number>();
  const predecessorMap = new Map<string, string | null>();
  const visited = new Set<string>();
  const relaxCount = new Map<string, number>(); // 记录节点“被改进后入队”的次数

  // init
  for (const node of nodes) {
    distanceMap.set(node, Infinity);
    predecessorMap.set(node, null);
    relaxCount.set(node, 0);
  }
  distanceMap.set(start, 0);

  const queue: string[] = [start];
  visited.add(start);
  relaxCount.set(start, 1);

  while (queue.length) {
    const current_node = queue.shift()!;
    visited.delete(current_node); // 出队则从集合移除

    const neighbors = Object.keys(graph[current_node] ?? {});
    for (const neighbor of neighbors) {
      const weight = graph[current_node][neighbor];
      const current_cost = distanceMap.get(current_node)!;

      // 松弛：发现更短路径则更新
      if (current_cost !== Infinity && current_cost + weight < distanceMap.get(neighbor)!) {
        distanceMap.set(neighbor, current_cost + weight);
        predecessorMap.set(neighbor, current_node);

        const times = (relaxCount.get(neighbor) || 0) + 1;
        relaxCount.set(neighbor, times);

        // 负环检测：若某点的入队次数 >= V，则存在可达负环
        if (times >= nodes.length) {
          throw new Error('Negative cycle detected (reachable from start)');
        }

        // 若 v 不在队列中，则入队并用于负环检测
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
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
const graph1: Graph = {
  A: { B: 1, C: 1, D: 3 },
  B: { A: 1, D: 2, E: 1 },
  C: { A: 1, D: 1 },
  D: { A: 2, B: 3, C: 1, E: 2 },
  E: { B: 1, D: 2 },
};

// Expect: a valid shortest path equal to Dijkstra’s on nonnegative graphs
console.log('res1:', bellmanFord(graph1, 'A', 'E'));

const graph2: Graph = {
  S: { A: 4, B: 5 },
  A: { C: -2 },
  B: { C: 3 },
  C: { T: 2 },
  T: {},
};
// With negative edge but no negative cycle
console.log('res2:', bellmanFord(graph2, 'S', 'T'));

const graph3: Graph = {
  X: { Y: 1 },
  Y: {},
  Z: {}, // isolated
};
// Unreachable
console.log('res3:', bellmanFord(graph3, 'X', 'Z'));

const graph4: Graph = {
  S: { A: 1 },
  A: { B: 1 },
  B: { C: 1 },
  C: { A: -4 }, // cycle sum = -2 => negative cycle
};
try {
  console.log('res4:', bellmanFord(graph4, 'S', 'C'));
} catch (e) {
  console.log('res4 throws:', String(e));
}
