export function prim(graph: number[][], vertices: number): [number, number[][]] {
  const mst: number[][] = [];
  let cost = 0;

  const queue: number[][] = [];
  const visited: Set<number> = new Set();
  let count = vertices - 1;

  // init
  for (const item of graph) {
    if (item[0] === 0 || item[1] === 0) {
      queue.push(item);
    }
  }
  visited.add(0);

  while (count && queue.length) {
    queue.sort((a, b) => a[2] - b[2]);

    const [u, v, weight] = queue.shift()!;

    if (!visited.has(u) || !visited.has(v)) {
      mst.push([u, v]);
      cost += weight;
      count--;

      const next = !visited.has(u) ? u : v;
      visited.add(next);
      for (const item of graph) {
        if ((item[0] === next && !visited.has(item[1])) || (item[1] === next && !visited.has(item[0]))) {
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
