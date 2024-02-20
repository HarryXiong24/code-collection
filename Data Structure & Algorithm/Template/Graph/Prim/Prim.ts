// 1584. Min Cost to Connect All Points

// You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

// Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

// Example 1:
// Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
// Output: 20
// Explanation:
// We can connect the points as shown above to get the minimum cost of 20.
// Notice that there is a unique path between every pair of points.

// Example 2:
// Input: points = [[3,12],[-2,5],[-4,1]]
// Output: 18

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
