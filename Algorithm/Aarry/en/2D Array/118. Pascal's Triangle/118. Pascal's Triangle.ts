// 118. Pascal's Triangle

// Given an integer numRows, return the first numRows of Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown

// Example 1:
// Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

// Example 2:
// Input: numRows = 1
// Output: [[1]]

export function generate(numRows: number): number[][] {
  const res: number[][] = [];
  if (numRows === 0) {
    return [];
  }

  for (let i = 0; i < numRows; i++) {
    if (i === 0) {
      res.push([1]);
    } else if (i === 1) {
      res.push([1, 1]);
    } else {
      // for every line, we create a new array, and fill in 1 at first.
      const temp = new Array(i + 1).fill(1);
      // except first and last elements, other elements value follow this formula:
      // temp[j] = res[i - 1][j - 1] + res[i - 1][j];
      for (let j = 1; j < i; j++) {
        temp[j] = res[i - 1][j - 1] + res[i - 1][j];
      }
      res.push(temp);
    }
  }

  return res;
}

// test
const res = generate(5);
console.log(res);
