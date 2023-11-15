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

// DFS
export function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: Map<number, Array<[number, number]>> = new Map();

  const DFS = (signalReceivedAt: number[], currNode: number, currTime: number): void => {
    // If the current time is greater than or equal to the fastest signal received
    // Then no need to iterate over adjacent nodes
    if (currTime >= signalReceivedAt[currNode]) {
      return;
    }

    // Fastest signal time for currNode so far
    signalReceivedAt[currNode] = currTime;

    if (!adj.has(currNode)) {
      return;
    }

    // Broadcast the signal to adjacent nodes
    for (const edge of adj.get(currNode)!) {
      const [travelTime, neighborNode] = edge;

      // currTime + time : time when signal reaches neighborNode
      DFS(signalReceivedAt, neighborNode, currTime + travelTime);
    }
  };

  // Build the adjacency list
  for (let time of times) {
    let [source, dest, travelTime] = time;

    if (!adj.has(source)) {
      adj.set(source, []);
    }

    adj.get(source)!.push([travelTime, dest]);
  }

  // Sort the edges connecting to every node
  for (let [node, edges] of adj) {
    edges.sort((a, b) => a[0] - b[0]);
  }

  let signalReceivedAt = new Array(n + 1).fill(Number.MAX_VALUE);

  DFS(signalReceivedAt, k, 0);

  let answer = Number.MIN_VALUE;
  for (let i = 1; i <= n; i++) {
    answer = Math.max(answer, signalReceivedAt[i]);
  }

  // Number.MAX_VALUE signifies at least one node is unreachable
  return answer === Number.MAX_VALUE ? -1 : answer;
}

// BFS
export function networkDelayTime_BFS(times: number[][], n: number, k: number): number {
  const adj: Map<number, Array<[number, number]>> = new Map();

  const BFS = (signalReceivedAt: number[], currNode: number, currTime: number): void => {
    const queue: number[][] = [[currNode, currTime]];

    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [currNode, currTime] = queue.shift()!;

        if (currTime >= signalReceivedAt[currNode]) {
          continue;
        }

        signalReceivedAt[currNode] = currTime;

        if (!adj.has(currNode)) {
          continue;
        }

        for (const edge of adj.get(currNode)!) {
          const [travelTime, neighborNode] = edge;
          queue.push([neighborNode, travelTime + currTime]);
        }
      }
    }
  };

  // Build the adjacency list
  for (let time of times) {
    const [source, dest, travelTime] = time;

    if (!adj.has(source)) {
      adj.set(source, []);
    }

    adj.get(source)!.push([travelTime, dest]);
  }

  // Sort the edges connecting to every node
  for (const [node, edges] of adj) {
    edges.sort((a, b) => a[0] - b[0]);
  }

  let signalReceivedAt = new Array(n + 1).fill(Number.MAX_VALUE);

  BFS(signalReceivedAt, k, 0);

  let answer = Number.MIN_VALUE;
  for (let i = 1; i <= n; i++) {
    answer = Math.max(answer, signalReceivedAt[i]);
  }

  // Number.MAX_VALUE signifies at least one node is unreachable
  return answer === Number.MAX_VALUE ? -1 : answer;
}

// test
const res = networkDelayTime_BFS(
  [
    [2, 1, 1],
    [2, 3, 1],
    [3, 4, 1],
  ],
  4,
  2
);
console.log(res);
