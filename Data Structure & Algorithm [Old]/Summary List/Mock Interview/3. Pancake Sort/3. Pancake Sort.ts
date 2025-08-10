// Pancake Sort

// Given an array of integers arr:

// Write a function flip(arr, k) that reverses the order of the first k elements in the array arr.
// Write a function pancakeSort(arr) that sorts and returns the input array. You are allowed to use only the function flip you wrote in the first step in order to make changes in the array.
// Example:

// input:  arr = [1, 5, 4, 3, 2]

// output: [1, 2, 3, 4, 5] # to clarify, this is pancakeSort's output
// Analyze the time and space complexities of your solution.

// Note: it’s called pancake sort because it resembles sorting pancakes on a plate with a spatula, where you can only use the spatula to flip some of the top pancakes in the plate. To read more about the problem, see the Pancake Sorting Wikipedia page.

// Just use two points to reverses the first k elements
function flip(arr: number[], k: number) {
  let left = 0;
  let right = k;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}

// Write a function flip(arr, k) that reverses the order of the first k elements in the array arr.
// Write a function pancakeSort(arr) that sorts and returns the input array. You are allowed to use only the function flip you wrote in the first step in order to make changes in the array.
export function pancakeSort(arr: number[]): number[] {
  // this function is used to find the max index in the specific length of arr
  const findMaxIndexInPrefix = (arr: number[], k: number): number => {
    let maxIndex = 0;

    for (let i = 0; i <= k; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }

    return maxIndex;
  };

  for (let i = arr.length - 1; i >= 0; i--) {
    const maxIndex = findMaxIndexInPrefix(arr, i); // find the max index
    flip(arr, maxIndex); // flip to let the max value in the top
    flip(arr, i); // flip to let the max value in the last
  }

  return arr;
}

// test
const res = pancakeSort([1, 5, 4, 3, 2]);
console.log(res);
