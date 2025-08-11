type EdgeMap = Record<string, number>;
type Graph = Record<string, EdgeMap>;

/**
 * SPFA (Queue-optimized Bellman–Ford) with Set-based in-queue tracking.
 * 使用 Set 记录“当前在队列中”的节点；支持负权边；检测从 start 可达的负环。
 * @param graph 邻接映射：graph[u][v] = w
 * @param start 起点
 * @param end 终点
 * @returns [shortestPath, cost]; 若不可达返回 [[], Infinity]
 * @throws Error 若存在从 start 可达的负环
 */
export function bellmanFord(graph: Graph, start: string, end: string): [string[], number] {
  const nodes = Object.keys(graph);
  // Guard: start/end 必须存在于图的 key 中
  if (!nodes.includes(start) || !nodes.includes(end)) {
    return [[], Infinity];
  }
  const V = nodes.length;

  // 1) 初始化距离、前驱、队列状态（Set 表示“当前在队列中”）
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();
  const cnt = new Map<string, number>(); // 记录节点“被改进后入队”的次数

  for (const u of nodes) {
    dist.set(u, Infinity);
    prev.set(u, null);
    cnt.set(u, 0);
  }
  dist.set(start, 0);

  const queue: string[] = [start];
  visited.add(start);
  cnt.set(start, 1);

  // 2) 主循环：队列不空则继续
  while (queue.length) {
    const u = queue.shift()!;
    visited.delete(u); // 出队则从集合移除

    const nbrs = graph[u] || {};
    for (const v of Object.keys(nbrs)) {
      const w = nbrs[v];
      const du = dist.get(u)!;
      const dv = dist.get(v)!;

      // 3) 松弛：发现更短路径则更新
      if (du !== Infinity && du + w < dv) {
        dist.set(v, du + w);
        prev.set(v, u);

        // 4) 若 v 不在队列中，则入队并用于负环检测
        if (!visited.has(v)) {
          queue.push(v);
          visited.add(v);

          const times = (cnt.get(v) || 0) + 1;
          cnt.set(v, times);

          // 5) 负环检测：若某点的入队次数 >= V，则存在可达负环
          if (times >= V) {
            throw new Error('Negative cycle detected (reachable from start)');
          }
        }
      }
    }
  }

  // 6) 路径还原：若不可达则返回空
  if (dist.get(end)! === Infinity) {
    return [[], Infinity];
  }
  const path: string[] = [];
  let cur: string | null = end;
  while (cur !== null) {
    path.push(cur);
    cur = prev.get(cur)!;
  }
  path.reverse();

  // 保险：若路径不以 start 开头，视为不可达
  if (path[0] !== start) return [[], Infinity];

  return [path, dist.get(end)!];
}

// ----------------- simple tests -----------------
const graph1: Graph = {
  A: { B: 1, C: 1, D: 3 },
  B: { A: 1, D: 2, E: 1 },
  C: { A: 1, D: 1 },
  D: { A: 2, B: 3, C: 1, E: 2 },
  E: { B: 1, D: 2 },
};
// Expect: a valid shortest path equal to Dijkstra’s on nonnegative graphs
console.log('ex1:', bellmanFord(graph1, 'A', 'E'));

const graph2: Graph = {
  S: { A: 4, B: 5 },
  A: { C: -2 },
  B: { C: 3 },
  C: { T: 2 },
  T: {},
};
// With negative edge but no negative cycle
console.log('ex2:', bellmanFord(graph2, 'S', 'T'));

const graph3: Graph = {
  X: { Y: 1 },
  Y: {},
  Z: {}, // isolated
};
// Unreachable
console.log('ex3:', bellmanFord(graph3, 'X', 'Z'));

const graph4: Graph = {
  S: { A: 1 },
  A: { B: 1 },
  B: { C: 1 },
  C: { A: -4 }, // cycle sum = -2 => negative cycle
};
try {
  console.log('ex4:', bellmanFord(graph4, 'S', 'C'));
} catch (e) {
  console.log('ex4 throws:', String(e));
}
