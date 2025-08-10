// 1365. How Many Numbers Are Smaller Than the Current Number

// Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

// Return the answer in an array.

// Example 1:
// Input: nums = [8,1,2,2,3]
// Output: [4,0,1,1,3]
// Explanation:
// For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3).
// For nums[1]=1 does not exist any smaller number than it.
// For nums[2]=2 there exist one smaller number than it (1).
// For nums[3]=2 there exist one smaller number than it (1).
// For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).

// Example 2:
// Input: nums = [6,5,4,8]
// Output: [2,1,0,3]

// Example 3:
// Input: nums = [7,7,7,7]
// Output: [0,0,0,0]

export function smallerNumbersThanCurrent(nums: number[]): number[] {
  const result: number[] = Array(nums.length).fill(0);
  const map: { [key: number]: number } = {};
  const nums_sort = [...nums].sort((a, b) => a - b);

  for (let i = nums_sort.length - 1; i >= 0; i--) {
    map[nums_sort[i]] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    result[i] = map[nums[i]];
  }

  return result;
}

// test
const res = smallerNumbersThanCurrent([8, 1, 2, 2, 3]);
console.log(res); // Output: [4, 0, 1, 1, 3]
