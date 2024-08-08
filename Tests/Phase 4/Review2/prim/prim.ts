export function prim(graph: number[][], vertices: number): [number, number[][]] {
  let cost = 0;
  const mst: number[][] = [];

  let count = vertices - 1;
  const visited: boolean[] = new Array(vertices).fill(false);
  const queue: number[][] = [];

  for (const item of graph) {
    if (item[0] === 0 || item[1] === 0) {
      queue.push(item);
    }
  }
  visited[0] = true;

  while (count && queue.length) {
    queue.sort((a, b) => a[2] - b[2]);

    const [v, w, weight] = queue.shift()!;

    if (!visited[v] || !visited[w]) {
      cost += weight;
      mst.push([v, w]);
      count--;

      const next_node = !visited[v] ? v : w;
      visited[next_node] = true;

      for (const item of graph) {
        if ((item[0] === next_node && !visited[item[1]]) || (item[1] === next_node && !visited[item[0]])) {
          queue.push(item);
        }
      }
    }
  }

  return [cost, mst];
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
