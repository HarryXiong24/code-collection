// 417. Pacific Atlantic Water Flow

// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

// The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

// Example 1:
// Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
// Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
// [0,4]: [0,4] -> Pacific Ocean
//        [0,4] -> Atlantic Ocean
// [1,3]: [1,3] -> [0,3] -> Pacific Ocean
//        [1,3] -> [1,4] -> Atlantic Ocean
// [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
//        [1,4] -> Atlantic Ocean
// [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
//        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
// [3,0]: [3,0] -> Pacific Ocean
//        [3,0] -> [4,0] -> Atlantic Ocean
// [3,1]: [3,1] -> [3,0] -> Pacific Ocean
//        [3,1] -> [4,1] -> Atlantic Ocean
// [4,0]: [4,0] -> Pacific Ocean
//        [4,0] -> Atlantic Ocean
// Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

// Example 2:
// Input: heights = [[1]]
// Output: [[0,0]]
// Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

function pacificAtlantic(heights: number[][]): number[][] {
  const Ocean = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const results: number[][] = [];
  const pacificSeen: Set<string> = new Set();
  const atlanticSeen: Set<string> = new Set();

  const recursive = (i: number, j: number, set: Set<string>, prev: number) => {
    if (i < 0 || i >= heights.length || j < 0 || j >= heights[0].length) {
      return;
    }
    if (prev > heights[i][j]) {
      return;
    }
    if (set.has(`row${i}-col${j}`)) {
      return;
    }
    const current = heights[i][j];
    set.add(`row${i}-col${j}`);
    for (const item of Ocean) {
      recursive(i + item[0], j + item[1], set, current);
    }
  };

  for (let col = 0; col < heights[0].length; col++) {
    // left side pacific
    recursive(0, col, pacificSeen, 0);
    // right side atlantic
    recursive(heights.length - 1, col, atlanticSeen, 0);
  }
  for (let row = 0; row < heights.length; row++) {
    // top side pacific
    recursive(row, 0, pacificSeen, 0);
    // bottom side atlantic
    recursive(row, heights.length - 1, atlanticSeen, 0);
  }

  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights.length; j++) {
      if (pacificSeen.has(`row${i}-col${j}`) && atlanticSeen.has(`row${i}-col${j}`)) {
        results.push([i, j]);
      }
    }
  }

  return results;
}

// test
const res = pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]);
console.log(res);
