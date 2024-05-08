// 63. Unique Paths II

// You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

// Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The testcases are generated so that the answer will be less than or equal to 2 * 109.

// Example 1:
// Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// Output: 2
// Explanation: There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right

// Example 2:
// Input: obstacleGrid = [[0,1],[0,0]]
// Output: 1

export function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  // -1 means this element is unhandled
  const dp: number[][] = [...new Array(m)].map(() => new Array(n).fill(-1));

  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
    return 0;
  }

  // init
  dp[0][0] = 1;
  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0; // 0 means here is the obstacle, no solution
      }
    }
  }

  for (let j = 1; j < n; j++) {
    if (dp[0][j] !== 0 && dp[0][j - 1] !== 0) {
      dp[0][j] = 1;
    } else {
      dp[0][j] = 0;
    }
  }

  for (let i = 1; i < m; i++) {
    if (dp[i][0] !== 0 && dp[i - 1][0] !== 0) {
      dp[i][0] = 1;
    } else {
      dp[i][0] = 0;
    }
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      if (dp[i][j] === 0) {
        continue;
      }
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// test
const res = uniquePathsWithObstacles([
  [0, 0],
  [1, 1],
  [0, 0],
]);
console.log(res);
