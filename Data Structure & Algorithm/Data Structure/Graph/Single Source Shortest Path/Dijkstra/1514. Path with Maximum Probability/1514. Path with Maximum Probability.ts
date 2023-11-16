// 1514. Path with Maximum Probability

// You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

// Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

// If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

// Example 1:
// Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
// Output: 0.25000
// Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.

// Example 2:
// Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
// Output: 0.30000

// Example 3:
// Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
// Output: 0.00000
// Explanation: There is no path between 0 and 2.

export function maxProbability(
  n: number,
  edges: number[][],
  succProb: number[],
  start_node: number,
  end_node: number
): number {
  const map = new Map<number, number[][]>();

  for (let i = 0; i < edges.length; i++) {
    const [source, dest] = edges[i];
    if (!map.has(source)) {
      map.set(source, []);
    }
    if (!map.has(dest)) {
      map.set(dest, []);
    }
    map.get(source)!.push([dest, succProb[i]]);
    map.get(dest)!.push([source, succProb[i]]);
  }

  const max_prob = new Array(n).fill(0);
  max_prob[start_node] = 1.0;

  const queue = [start_node];
  while (queue.length) {
    const current = queue.shift()!;
    if (map.has(current)) {
      for (const item of map.get(current)!) {
        const [next, cost] = [...item];
        if (cost * max_prob[current] > max_prob[next]) {
          max_prob[next] = cost * max_prob[current];
          queue.push(next);
        }
      }
    }
  }

  return max_prob[end_node];
}

// test
const res = maxProbability(
  3,
  [
    [0, 1],
    [1, 2],
    [0, 2],
  ],
  [0.5, 0.5, 0.2],
  0,
  2
);
console.log(res);
