// Prim's algorithm depends on the vertices of the graph, whereas Kruskal's algorithm depends on the edges.
// For a graph with relatively fewer edges (sparse graph), Kruskal's algorithm might be a better choice
// For a graph with many edges (dense graph), Prim's algorithm might be more efficient.

// O(E + V log V), E is # of edges, V is # of vertices
export function Prim(edges: number[][], points: number): [number, number[][]] {
  let arr: number[][] = [];
  const visited: boolean[] = new Array(points).fill(false);

  for (let i = 0; i < edges.length; i++) {
    if (edges[i][0] === 0 || edges[i][1] === 0) {
      arr.push(edges[i]);
    }
  }

  arr.sort((a, b) => a[2] - b[2]);

  let count = points - 1;
  let res = 0;
  visited[0] = true;
  const path: number[][] = [];

  while (arr.length && count > 0) {
    const [point1, point2, weight] = arr.shift()!;

    if (!visited[point2] || !visited[point2]) {
      res = res + weight;
      path.push([point1, point2]);
      const newPoint = visited[point1] ? point2 : point1;
      visited[newPoint] = true;

      // 更新候选边集合
      for (const edge of edges) {
        if ((edge[0] === newPoint && !visited[edge[1]]) || (edge[1] === newPoint && !visited[edge[0]])) {
          arr.push(edge);
        }
      }

      arr.sort((a, b) => a[2] - b[2]);
      count--;
    }
  }

  return [res, path];
}

// test
const res = Prim(
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
