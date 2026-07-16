export function prim(graph: number[][], vertices: number): [number, number[][]] {
  let cost = 0;
  const path: number[][] = [];

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

  while (count > 0 && queue.length) {
    queue.sort((a, b) => a[2] - b[2]);
    const [v, w, weight] = queue.shift()!;
    if (!visited[v] || !visited[w]) {
      const new_node = !visited[v] ? v : w;
      cost += weight;
      path.push([v, w]);
      count--;
      visited[new_node] = true;

      for (const item of graph) {
        if ((item[0] === new_node && !visited[item[1]]) || (item[1] === new_node && !visited[item[0]])) {
          queue.push(item);
        }
      }
    }
  }

  return [cost, path];
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
