// 119. Pascal's Triangle II

// Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

// Example 1:
// Input: rowIndex = 3
// Output: [1,3,3,1]

// Example 2:
// Input: rowIndex = 0
// Output: [1]

// Example 3:
// Input: rowIndex = 1
// Output: [1,1]

// Iterative
export function getRow(rowIndex: number): number[] {
  let result: number[][] = [];

  for (let i = 0; i < rowIndex + 1; i++) {
    let newRow = new Array(i + 1).fill(1);
    for (let j = 1; j < newRow.length - 1; j++) {
      newRow[j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    result.push(newRow);
  }

  return result[rowIndex];
}

// Recursive
export function getRow1(rowIndex: number): number[] {
  const recursive = (index: number) => {
    if (index === 0) {
      return [1];
    }

    if (index === 1) {
      return [1, 1];
    }
    const lastRow = recursive(index - 1);

    const currentRow = new Array(index + 1).fill(1);
    for (let i = 1; i < currentRow.length - 1; i++) {
      currentRow[i] = lastRow[i - 1] + lastRow[i];
    }

    return currentRow;
  };

  return recursive(rowIndex);
}

// test
const res = getRow1(3);
console.log(res);
