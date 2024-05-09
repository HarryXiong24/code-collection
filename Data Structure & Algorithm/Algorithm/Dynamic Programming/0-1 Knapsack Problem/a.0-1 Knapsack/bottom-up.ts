// Suppose you have a list of weights and corresponding values for n items. You have a knapsack that can carry items up to a specific maximum weight, known as the capacity of the knapsack.

// You want to maximize the sum of values of the items in your knapsack while ensuring that the sum of the weights of the items remains less than or equal to the knapsack’s capacity.

// If all the combinations exceed the given knapsack’s capacity, then return 0.

// Note: While adding items in the knapsack, we either add the complete item or don’t add it. Moreover, we can’t add an item again that is already in the bag.

// Let’s say you have a knapsack capacity of 5 and a list of items with weights and values as follows:

// weights = [1, 2, 3, 5]

// values = [10, 5, 4, 8]

// There are four ways of storing items in the knapsack, such that the combined weight of stored items is less than or equal to the knapsack’s capacity.

// Item of weight 1 and weight 2, with a total value of 15.
// Item of weight 1 and weight 3, with a total value of 14.
// Item of weight 2 and weight 3, with a total value of 9.
// Item of weight 5, with a value of 8.
// Though all of the combinations described above are valid, we need to select the one with the maximum value. Hence, we will select items with weights 1 and 2, as they give us the maximum value of 15.

// bottom up
export function findKnapsack(capacity: number, weights: number[], values: number[], n: number): number {
  // because index is begin at 0
  const dp: number[][] = [...Array(n + 1)].map(() => Array(capacity + 1).fill(0));

  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      if (i === 0 || j === 0) {
        // initialize the table with 0 when either the row or column is 0
        dp[i][j] = 0;
      } else if (weights[i - 1] <= j) {
        // check if the weight of an item is less than the capacity
        dp[i][j] = Math.max(values[i - 1] + dp[i - 1][j - weights[i - 1]], dp[i - 1][j]);
      } else {
        // we don't include the item if the weight is greater than the capacity.
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][capacity];
}

export function findKnapsack2(capacity: number, weights: number[], values: number[]): number {
  const length = weights.length;
  const dp: number[][] = [...Array(length)].map(() => Array(capacity + 1).fill(0));

  // init
  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      if (i === 0) {
        dp[i][j] = values[0];
      }
      if (j === 0) {
        dp[i][j] = 0;
      }
    }
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      if (j < weights[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - weights[i]] + values[i], dp[i - 1][j]);
      }
    }
  }

  return dp[length - 1][capacity];
}

export function findKnapsack3(capacity: number, weights: number[], values: number[]): number {
  const length = weights.length;
  const dp: number[] = [...Array(capacity + 1)].fill(0);

  // init
  dp[0] = 0;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < dp.length; j++) {
      if (j < weights[i]) {
        dp[j] = dp[j];
      } else {
        dp[j] = Math.max(dp[j], dp[j - i] + values[i]);
      }
    }
  }

  return dp[capacity];
}

const capacity = 5;
const weights = [1, 2, 3, 5];
const values = [10, 5, 4, 8];
const res = findKnapsack(capacity, weights, values, weights.length);
const res2 = findKnapsack2(capacity, weights, values);
const res3 = findKnapsack2(capacity, weights, values);
console.log(res);
console.log(res2);
console.log(res3);
