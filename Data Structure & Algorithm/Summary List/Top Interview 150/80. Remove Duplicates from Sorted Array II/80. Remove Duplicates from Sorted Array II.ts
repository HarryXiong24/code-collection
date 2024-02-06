// 80. Remove Duplicates from Sorted Array II

// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

// Return k after placing the final result in the first k slots of nums.

// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

// Custom Judge:
// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

// Example 1:
// Input: nums = [1,1,1,2,2,3]
// Output: 5, nums = [1,1,2,2,3,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:
// Input: nums = [0,0,1,1,1,1,2,3,3]
// Output: 7, nums = [0,0,1,1,2,3,3,_,_]
// Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// T: O(n)
// S: O(n)
export function removeDuplicates(nums: number[]): number {
  const record_table = new Map<number, number>();
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    const current_count = record_table.get(nums[fast]);
    if (!current_count || current_count < 2) {
      record_table.set(nums[fast], current_count ? current_count + 1 : 1);
      nums[slow] = nums[fast];
      slow++;
      fast++;
    } else {
      fast++;
    }
  }

  return slow;
}

// T: O(n)
// S: O(n)
// Actually, we don't need the record table.
export function removeDuplicates_better(nums: number[]): number {
  let count = 1;
  let slow = 1;
  let fast = 1;

  while (fast < nums.length) {
    if (nums[fast] === nums[fast - 1]) {
      count++;
    } else {
      count = 1;
    }

    if (count <= 2) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
}

// test
const res = removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]);
const res1 = removeDuplicates_better([0, 0, 1, 1, 1, 1, 2, 3, 3]);
console.log(res);
console.log(res1);
