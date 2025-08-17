// 787. Cheapest Flights Within K Stops

// There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

// You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

// Example 1:
// Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
// Output: 700
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
// Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

// Example 2:
// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
// Output: 200
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.

// Example 3:
// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
// Output: 500
// Explanation:
// The graph is shown above.
// The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

export function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  let dist = new Array<number>(n).fill(Infinity);
  dist[src] = 0;

  // 进行 k+1 轮松弛，每轮都只基于上一轮的 dist
  for (let i = 0; i <= k; i++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < next[v]) {
        next[v] = dist[u] + w;
      }
    }
    dist = next;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}

function findCheapestPriceDijikstra(n: number, flights: number[][], src: number, dst: number, k: number): number {
  const adj: number[][][] = Array.from({ length: n }, () => []);
  for (const [u, v, w] of flights) adj[u].push([v, w]);

  // best[node][stops] = 到达 node 且使用 stops 次停留的最小花费
  const best = Array.from({ length: n }, () => new Array<number>(k + 2).fill(Infinity));
  best[src][0] = 0;

  // 简易堆：用数组代替，小数据也能过；需要更高效可实现二叉堆
  const pq: [number, number, number][] = [[0, src, 0]]; // [cost, node, stopsUsed]

  while (pq.length) {
    // 取出当前最小 cost 的状态
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, u, stops] = pq.shift()!;

    if (u === dst) {
      return cost;
    }

    if (stops > k) {
      continue; // 不能再扩展
    }

    for (const [v, w] of adj[u]) {
      const nc = cost + w;
      const ns = stops + 1;
      if (ns <= k + 1 && nc < best[v][ns - 1]) {
        best[v][ns - 1] = nc;
        pq.push([nc, v, ns]);
      }
    }
  }
  return -1;
}

// Time Limit Exceeded
function findCheapestPrice_Backtrack(n: number, flights: number[][], src: number, dst: number, k: number): number {
  const visited = new Set();
  let result = Infinity;
  let cost = 0;

  const backtrack = (current: number, count: number) => {
    if (count > k + 1) {
      return;
    }

    if (cost >= result) {
      return;
    }

    if (current === dst && count <= k + 1) {
      result = Math.min(result, cost);
      return;
    }

    for (let i = 0; i < flights.length; i++) {
      if (flights[i][0] === current) {
        const neighbor = flights[i][1];
        const weight = flights[i][2];

        if (visited.has(neighbor)) {
          continue;
        }

        visited.add(neighbor);
        cost += weight;
        backtrack(neighbor, count + 1);
        visited.delete(neighbor);
        cost -= weight;
      }
    }
  };

  visited.add(src);
  backtrack(src, 0);

  return result === Infinity ? -1 : result;
}

// test
const res = findCheapestPrice(
  3,
  [
    [0, 1, 100],
    [1, 2, 100],
    [0, 2, 500],
  ],
  0,
  2,
  1
);
console.log(res);
