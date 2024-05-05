// Given an array of positive integers, `arr`, and a target, `T`, build an expression using these numbers by inserting a ++ or a −− before each integer, and evaluating this expression. Find the total number of different expressions that evaluate to `T`.

// For example, considering an array [1, 1] and a target 0, we can build the following expressions:

// | Expression | Sum |
// | --- | --- |
// | + 1 + 1 | 2 |
// | + 1 – 1 | 0 |
// | – 1 + 1 | 0 |
// | – 1 – 1 | –2 |

// The total number of expressions that evaluate to the target is 2.

// recursion
export function findTargetSumWays(arr: number[], T: number) {
  const recursion = (arr: number[], i: number, T: number, sum: number): number => {
    // If all integers are processed
    if (i == arr.length) {
      // If target is reached
      if (sum === T) {
        return 1;
      }
      // If target is not reached
      return 0;
    }

    // Return total count of the following cases:
    //       1. Add current element to the target
    //       2. Subtract current element from the target
    return recursion(arr, i + 1, T, sum + arr[i]) + recursion(arr, i + 1, T, sum - arr[i]);
  };

  return recursion(arr, 0, T, 0);
}

// test
const res = findTargetSumWays([1, 1, 1, 1], 2);
console.log(res);
