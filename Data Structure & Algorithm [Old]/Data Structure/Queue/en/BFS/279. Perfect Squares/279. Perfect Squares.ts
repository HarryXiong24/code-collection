// 279. Perfect Squares

// Given an integer n, return the least number of perfect square numbers that sum to n.
// A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself.
// For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

// Example 1:
// Input: n = 12
// Output: 3
// Explanation: 12 = 4 + 4 + 4.

// Example 2:
// Input: n = 13
// Output: 2
// Explanation: 13 = 4 + 9.

// BFS
// hint: if just find a answer that just meet a equation instead of finding a least answer, it can also use DFS.
// So remember that BFS can find a optimal solution, but DFS can't
export function numSquares(n: number): number {
  // generate all possible squares
  const squares: number[] = [];
  for (let i = 1; i <= n && i * i <= n; i++) {
    squares.push(i * i);
  }

  // BFS
  const queue: number[] = [0];
  let layer = 0;
  const set = new Set();

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue[0];
      if (current === n) {
        return layer;
      }
      // if there is no some limit conditions, it will exceed time expectancy.// @algorithm
      // so it need to create a new set to improve performance
      for (const item of squares) {
        if (current + item <= n && !set.has(current + item)) {
          set.add(current + item);
          queue.push(current + item);
        }
      }
      queue.shift();
    }
    layer++;
  }

  return -1;
}

// test
const res = numSquares(13);
console.log(res);

// DFS
export function numSquares1(n: number): number {
  // generate all possible squares
  let squares: number[] = [];
  for (let i = 1; i <= n && i * i <= n; i++) {
    squares.push(i * i);
  }
  squares = squares.reverse();

  // DFS
  const stack: number[] = [];
  let sum = 0;
  console.log(squares);
  while (squares.length) {
    const current = squares[0];
    sum = sum + current;
    stack.push(current);
    if (sum === n) {
      return stack.length;
    } else if (sum > n) {
      sum = sum - current;
      stack.pop();
      squares.shift();
    } else {
      continue;
    }
  }

  return stack.length;
}
