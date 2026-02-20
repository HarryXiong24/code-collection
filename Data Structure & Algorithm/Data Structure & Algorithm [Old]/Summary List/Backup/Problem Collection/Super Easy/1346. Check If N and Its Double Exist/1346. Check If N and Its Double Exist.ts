// 1346. Check If N and Its Double Exist

// Given an array arr of integers, check if there exist two indices i and j such that :

// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]

// Example 1:
// Input: arr = [10,2,5,3]
// Output: true
// Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]

// Example 2:
// Input: arr = [3,1,7,11]
// Output: false
// Explanation: There is no i and j that satisfy the conditions.

// Using map
// Time Complexity: O(n)
// Space Complexity: O(n)
export function checkIfExist(arr: number[]): boolean {
  const map = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i] * 2, i);
  }

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i]) && i !== map.get(arr[i])) {
      return true;
    }
  }

  return false;
}

// test
const res = checkIfExist([3, 1, 7, 11]);
console.log(res);
