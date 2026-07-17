# Dynamic Programming Algorithms

This directory contains various implementations of dynamic programming algorithms. Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant computations.

## Algorithms Included

- **Coin Change Problem** (`coin_change.rs`)
  - Determines the minimum number of coins needed to make a given amount.
  - Time Complexity: O(n * m), where `n` is the amount and `m` is the number of coin types.

- **Edit Distance** (`edit_distance.rs`)
  - Calculates the minimum number of operations required to convert one string into another.
  - Time Complexity: O(m * n), where `m` and `n` are the lengths of the two strings.

- **Egg Dropping Problem** (`egg_dropping.rs`)
  - Determines the minimum number of attempts needed to find the highest floor from which an egg can be dropped without breaking.
  - Time Complexity: O(k * n), where `k` is the number of eggs and `n` is the number of floors.

- **Fibonacci Sequence** (`fibonacci.rs`)
  - Computes the `n`th Fibonacci number.
  - Time Complexity: O(n)

- **Knapsack Problem** (`knapsack.rs`)
  - Solves the problem of selecting items with given weights and values to maximize total value without exceeding the weight capacity.
  - Time Complexity: O(n * W), where `n` is the number of items and `W` is the weight capacity.

- **Longest Common Subsequence** (`longest_common_subsequence.rs`)
  - Finds the longest subsequence present in both of the given sequences.
  - Time Complexity: O(m * n), where `m` and `n` are the lengths of the two sequences.

- **Longest Increasing Subsequence** (`longest_increasing_subsequence.rs`)
  - Finds the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order.
  - Time Complexity: O(n^2) with dynamic programming approach.

- **Maximum Subarray** (`maximum_subarray.rs`)
  - Finds the contiguous subarray within a one-dimensional array of numbers which has the largest sum.
  - Time Complexity: O(n)

- **Rod Cutting Problem** (`rod_cutting.rs`)
  - Determines the maximum revenue obtainable by cutting up a rod and selling the pieces.
  - Time Complexity: O(n^2)

## References
- [Introduction to Algorithms by Cormen et al.](https://books.google.co.in/books?id=RSMuEAAAQBAJ&lpg=PR13&ots=a3i4WT9DSM&dq=%5BIntroduction%20to%20Algorithms%20by%20Cormen%20et%20al.%5D&lr&pg=PR13#v=onepage&q=%5BIntroduction%20to%20Algorithms%20by%20Cormen%20et%20al.%5D&f=false)
- [Dynamic Programming - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)


