// A subarray is any contiguous block of an array's elements. Given an array of integers, find the sum of all elements of all subarrays of that array.

// Example:
// For example, a three element array [4, 5, 6] can be made into the following subarrays:
// 1 element subarrays: [4], [5], [6]
// 2 element subarrays: [4,5], [5,6]
// 3 element subarrays: [4, 5, 6]
// The sum of all subarrays is 4 + 5 + 6 + (4+5) + (5+6) + (4 + 5 + 6) = 50.

function subarraySum(arr: number[]): number {
  const n = arr.length;
  let totalSum = 0;

  for (let i = 0; i < n; i++) {
    let subarraySum = 0;

    for (let j = i; j < n; j++) {
      subarraySum += arr[j];
      totalSum += subarraySum;
    }
  }

  return totalSum;
}

// Optimize
export function subarraySum_Optimize(arr: number[]): number {
  const n = arr.length;
  let totalSum = 0;
  let prefixSum = new Array(n);

  prefixSum[0] = arr[0];
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + arr[i];
  }

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (i === 0) {
        totalSum += prefixSum[j];
      } else {
        totalSum += prefixSum[j] - prefixSum[i - 1];
      }
    }
  }

  return totalSum;
}

// test
const arr = [4, 5, 6];
const result = subarraySum(arr);
console.log(result);
