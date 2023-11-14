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

type Edge = [number, number, number];

export function minCostConnectPoints(points: number[][]): number {
  const arr: Edge[] = [];
  const visited: boolean[] = new Array(points.length).fill(false);

  if (points.length === 0) {
    return 0;
  }

  const [x1, y1] = points[0];
  for (let i = 1; i < points.length; i++) {
    const [x2, y2] = points[i];
    const weight = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    const edge: Edge = [0, i, weight];
    arr.push(edge);
  }

  arr.sort((a, b) => a[2] - b[2]);

  let count = points.length - 1;
  let res = 0;
  visited[0] = true;
  while (arr.length && count > 0) {
    const [point1, point2, weight] = arr.shift()!;
    if (!visited[point2]) {
      res = res + weight;
      visited[point2] = true;
      for (let i = 0; i < points.length; i++) {
        if (!visited[i]) {
          const weight = Math.abs(points[point2][0] - points[i][0]) + Math.abs(points[point2][1] - points[i][1]);
          const edge: Edge = [point2, i, weight];
          arr.push(edge);
          arr.sort((a, b) => a[2] - b[2]);
        }
      }
      count--;
    }
  }

  return res;
}

// test
const res = minCostConnectPoints([
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
]);
console.log(res);
