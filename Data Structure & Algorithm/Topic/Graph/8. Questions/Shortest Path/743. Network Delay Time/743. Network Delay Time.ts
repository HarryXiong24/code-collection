// 743. Network Delay Time

// You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

// We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

// Example 1:
// Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
// Output: 2

// Example 2:
// Input: times = [[1,2,1]], n = 2, k = 1
// Output: 1

// Example 3:
// Input: times = [[1,2,1]], n = 2, k = 2
// Output: -1

export function networkDelayTime(times: number[][], n: number, k: number): number {
  const distanceMap: Map<number, number> = new Map();

  for (let i = 1; i <= n; i++) {
    distanceMap.set(i, Infinity);
  }

  const visited = new Set();
  const queue = [[k, 0]];
  distanceMap.set(k, 0);

  while (queue.length) {
    queue.sort((a, b) => a[1] - b[1]);

    const [current_node, current_cost] = queue.shift()!;
    if (visited.has(current_node)) {
      continue;
    }
    visited.add(current_node);

    for (const [from, to, weight] of times) {
      if (from === current_node) {
        if (current_cost + weight < distanceMap.get(to)!) {
          distanceMap.set(to, current_cost + weight);
          queue.push([to, current_cost + weight]);
        }
      }
    }
  }

  if (visited.size !== n) {
    return -1;
  }

  return Math.max(...distanceMap.values());
}

// test
const res = networkDelayTime(
  [
    [2, 1, 1],
    [2, 3, 1],
    [3, 4, 1],
  ],
  4,
  2
);
console.log(res);
