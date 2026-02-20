// Get Maximum Sum Arr

// At Amazon, the team at the fulfillment center is responsible for the packaging process. There is an array, item_weights, of n items to pack. The team needs to create a new array, new_arr, by removing exactly n/3 items from item_weights without changing the order of those remaining.

// - The sum_arr of array new_arr is defined as the sum of the weights or elements in the first half of the array minus the sum of the weights in the second half of the array. - Given n items and an array item_weights, find the maximum sum_arr possible.

// Function Description

// Complete the function getMaxSumArr in the editor below.

// getMaxSumArr has the following parameters:

// int item_weights[n]: item weights
// Returns

// int: the maximum possible sum_arr

// Example 1:
// Input:  item_weights = [3, 2, 1]
// Output: 2

export function getMaxSumArr(item_weights: number[]): number {
  const k = item_weights.length / 3; // 需要删除的元素数
  const prefix = new Array(item_weights.length).fill(0);
  const suffix = new Array(item_weights.length).fill(0);

  // 优先队列：前半部分用最小堆
  const minHeap: number[] = [];
  let leftSum = 0;

  // 计算前半部分的最大和
  for (let i = 0; i < item_weights.length; i++) {
    leftSum += item_weights[i];
    minHeap.push(item_weights[i]);
    minHeap.sort((a, b) => a - b); // 保持最小堆顺序

    if (minHeap.length > k) {
      leftSum -= minHeap.shift()!;
    }
    prefix[i] = leftSum;
  }

  // 优先队列：后半部分用最大堆
  const maxHeap: number[] = [];
  let rightSum = 0;

  // 计算后半部分的最小和
  for (let i = item_weights.length - 1; i >= 0; i--) {
    rightSum += item_weights[i];
    maxHeap.push(item_weights[i]);
    maxHeap.sort((a, b) => b - a); // 保持最大堆顺序

    if (maxHeap.length > k) {
      rightSum -= maxHeap.shift()!;
    }
    suffix[i] = rightSum;
  }

  // 计算最大 sum_arr
  let maxSumArr = -Infinity;
  for (let i = k - 1; i < item_weights.length - k; i++) {
    maxSumArr = Math.max(maxSumArr, prefix[i] - suffix[i + 1]);
  }

  return maxSumArr;
}

// test
const res = getMaxSumArr([1, 3, 4, 7, 5, 2]);
console.log(res);
