// 474. Ones and Zeroes

// You are given an array of binary strings strs and two integers m and n.

// Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

// A set x is a subset of a set y if all elements of x are also elements of y.

// Example 1:
// Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
// Output: 4
// Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
// Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
// {"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.

// Example 2:
// Input: strs = ["10","0","1"], m = 1, n = 1
// Output: 2
// Explanation: The largest subset is {"0", "1"}, so the answer is 2.

type BinaryInfo = { numOfZero: number; numOfOne: number };

function countBinary(str: string): BinaryInfo {
  let numOfZero: number = 0;
  let numOfOne: number = 0;

  for (const s of str) {
    if (s === '0') {
      numOfZero++;
    } else {
      numOfOne++;
    }
  }

  return { numOfZero, numOfOne };
}

export function findMaxForm(strs: string[], m: number, n: number): number {
  // dp[i][j][k]: 前i个物品中, 背包的 0 容量为 j, 1 容量为 k, 最多能放的物品数量
  const dp: number[][][] = new Array(strs.length)
    .fill(0)
    .map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)));

  // init
  const { numOfZero, numOfOne } = countBinary(strs[0]);
  for (let j = numOfZero; j <= m; j++) {
    for (let k = numOfOne; k <= n; k++) {
      dp[0][j][k] = 1;
    }
  }

  for (let i = 1; i < dp.length; i++) {
    const { numOfZero, numOfOne } = countBinary(strs[i]);
    for (let j = 0; j < dp[i].length; j++) {
      for (let k = 0; k < dp[i][j].length; k++) {
        if (j < numOfZero || k < numOfOne) {
          dp[i][j][k] = dp[i - 1][j][k];
        } else {
          dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i - 1][j - numOfZero][k - numOfOne] + 1);
        }
      }
    }
  }

  return dp[strs.length - 1][m][n];
}

// test
const res = findMaxForm(['10', '0001', '111001', '1', '0'], 5, 3);
console.log(res);
