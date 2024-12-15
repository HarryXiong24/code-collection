// 10. Pairs with Specific Difference

// Given an array arr of distinct integers and a nonnegative integer k, write a function findPairsWithGivenDifference that returns an array of all pairs [x,y] in arr, such that x - y = k. If no such pairs exist, return an empty array.

// Note: the order of the pairs in the output array should maintain the order of the y element in the original array.

// Examples:
// input:  arr = [0, -1, -2, 2, 1], k = 1
// output: [[1, 0], [0, -1], [-1, -2], [2, 1]]

// input:  arr = [1, 7, 5, 3, 32, 17, 12], k = 17
// output: []

export function findPairsWithGivenDifference(arr: number[], k: number) {
  const map = new Map();
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i] - k, arr[i]);
  }

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      answer.push([map.get(arr[i]), arr[i]]);
    }
  }

  return answer;
}

// test
const res = findPairsWithGivenDifference([0, -1, -2, 2, 1], 1);
console.log(res);
