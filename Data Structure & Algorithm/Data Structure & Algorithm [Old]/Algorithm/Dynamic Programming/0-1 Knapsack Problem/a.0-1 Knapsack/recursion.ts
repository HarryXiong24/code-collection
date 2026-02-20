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

// Native
export function findKnapsack(capacity: number, weights: number[], values: number[], n: number): number {
  const recursion = (capacity: number, weights: number[], values: number[], n: number): number => {
    if (n === 0 || capacity === 0) {
      return 0;
    }

    if (weights[n - 1] <= capacity) {
      // check if the weight of the nth item is less than capacity then
      // either
      // We include the item and reduce the weigth of item from the total weight
      // or
      // We don't include the item
      return Math.max(
        values[n - 1] + recursion(capacity - weights[n - 1], weights, values, n - 1),
        recursion(capacity, weights, values, n - 1)
      );
    } else {
      // if its weight is greater than the capacity, item can't be added in our knapsack
      return recursion(capacity, weights, values, n - 1);
    }
  };

  return recursion(capacity, weights, values, n);
}

const capacity = 30;
const weights = [10, 20, 30];
const values = [22, 33, 44];
const res = findKnapsack(capacity, weights, values, weights.length);
console.log(res);
