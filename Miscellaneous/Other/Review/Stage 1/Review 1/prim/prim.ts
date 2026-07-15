export function prim(graph: number[][], vertices: number): [number, number[][]] {
  let cost = 0;
  const path: number[][] = [];
  let count = vertices - 1;

  const visited = new Array(vertices).fill(false);
  const record_array: number[][] = [];

  // init
  for (const item of graph) {
    if (item[0] === 0 || item[1] === 0) {
      record_array.push(item);
    }
  }
  visited[0] = true;

  while (record_array.length && count > 0) {
    record_array.sort((a, b) => a[2] - b[2]);

    const [v, w, weight] = record_array.shift()!;

    if (!visited[v] || !visited[w]) {
      cost = cost + weight;
      path.push([v, w]);
      const new_vertex = visited[v] ? w : v;
      visited[new_vertex] = true;
      count--;

      for (const item of graph) {
        if ((item[0] === new_vertex && !visited[item[1]]) || (item[1] === new_vertex && !visited[item[0]])) {
          record_array.push(item);
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
