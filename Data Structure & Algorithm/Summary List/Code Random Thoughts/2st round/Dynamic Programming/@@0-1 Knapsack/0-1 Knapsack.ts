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

export function findKnapsack(capacity: number, item: number, weights: number[], values: number[]): number {
  const dp: number[][] = [...Array(item)].map(() => Array(capacity + 1).fill(0));

  // init
  for (let j = 0; j <= capacity; j++) {
    if (weights[0] <= j) {
      dp[0][j] = values[0];
    }
  }

  for (let i = 0; i < item; i++) {
    dp[i][0] = 0;
  }

  // iterative
  for (let i = 1; i < item; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (j - weights[i] <= 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i]] + values[i]);
      }
    }
  }

  return dp[item - 1][capacity];
}

export function findKnapsackRecursion(capacity: number, item: number, weights: number[], values: number[]): number {
  const recursion = (currentItem: number, remainingCapacity: number): number => {
    if (currentItem < 0 || capacity <= 0) {
      return 0;
    }

    if (remainingCapacity - weights[currentItem] <= 0) {
      return recursion(currentItem - 1, remainingCapacity);
    } else {
      return Math.max(
        recursion(currentItem - 1, remainingCapacity),
        recursion(currentItem - 1, remainingCapacity - weights[currentItem]) + values[currentItem]
      );
    }
  };

  return recursion(item - 1, capacity);
}

// test
const capacity = 5;
const weights = [1, 2, 3, 5];
const values = [10, 5, 4, 8];

const res = findKnapsack(capacity, weights.length, weights, values);
console.log(res);

const res2 = findKnapsackRecursion(capacity, weights.length, weights, values);
console.log(res2);
