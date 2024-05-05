// Given an array of positive integers, `arr`, and a target, `T`, build an expression using these numbers by inserting a ++ or a −− before each integer, and evaluating this expression. Find the total number of different expressions that evaluate to `T`.

// For example, considering an array [1, 1] and a target 0, we can build the following expressions:

// | Expression | Sum |
// | --- | --- |
// | + 1 + 1 | 2 |
// | + 1 – 1 | 0 |
// | – 1 + 1 | 0 |
// | – 1 – 1 | –2 |

// The total number of expressions that evaluate to the target is 2.

// memoization
export function findTargetSumWays(arr: number[], T: number) {
  const total = arr.reduce((prev, cur) => prev + cur);

  // the reason why we need 2 * total + 1 is because we can +1 and -1
  // like [1, 1, 1, 1], the value range will be [-4, 4], so we need 2 * total + 1
  const dp: number[][] = [...Array(arr.length)].map(() => Array(2 * total + 1).fill(-1));

  const recursion = (arr: number[], i: number, T: number, sum: number): number => {
    // If all integers are processed
    if (i == arr.length) {
      // If target is reached
      if (sum == T) {
        return 1;
      }
      // If target is not reached
      return 0;
    }

    if (dp[i][total + sum] !== -1) {
      return dp[i][total + sum];
    }

    dp[i][total + sum] = recursion(arr, i + 1, T, sum - arr[i]) + recursion(arr, i + 1, T, sum + arr[i]);

    return dp[i][total + sum];
  };

  return recursion(arr, 0, T, 0);
}

// test
const res = findTargetSumWays([1, 1, 1, 1], 2);
console.log(res);
