export function prim(graph: number[][], vertices: number): [number, number[][]] {
  let cost: number = 0;
  const min_spanning_tree: number[][] = [];

  const visited: boolean[] = new Array(vertices).fill(false);
  let count = vertices - 1;
  const queue: number[][] = [];

  // init
  visited[0] = true;
  for (const item of graph) {
    if (item[0] === 0 || item[1] === 0) {
      queue.push(item);
    }
  }

  while (count > 0 && queue.length > 0) {
    queue.sort((a, b) => a[2] - b[2]);
    const [v, w, weight] = queue.shift()!;

    if (!visited[v] || !visited[w]) {
      cost += weight;
      min_spanning_tree.push([v, w]);
      count--;

      const next_node = visited[v] ? w : v;
      visited[next_node] = true;
      for (const item of graph) {
        if ((item[0] === next_node && !visited[item[1]]) || (item[1] === next_node && !visited[item[0]])) {
          queue.push(item);
        }
      }
    }
  }

  return [cost, min_spanning_tree];
}

// test
const res = prim(
  [
    [0, 1, 4],
    [0, 2, 13],
    [0, 3, 7],
    [0, 4, 7],
    [1, 2, 9],
    [1, 3, 3],
    [1, 4, 7],
    [2, 3, 10],
    [2, 4, 14],
    [3, 4, 4],
  ],
  5
);
console.log(res);
