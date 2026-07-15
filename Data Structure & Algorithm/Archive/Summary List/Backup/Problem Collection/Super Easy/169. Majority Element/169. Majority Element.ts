// 169. Majority Element

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

// Example 1:
// Input: nums = [3,2,3]
// Output: 3

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// Using Map
// Time Complexity: O(n)
// Space Complexity: O(n)
export function majorityElement(nums: number[]): number {
  const map = new Map<number, number>();

  const majority_element = Math.floor(nums.length / 2);
  let res: number = 0;

  for (const item of nums) {
    if (map.has(item)) {
      const temp = map.get(item)!;
      map.set(item, temp + 1);
    } else {
      map.set(item, 1);
    }
  }

  for (const [key, value] of map.entries()) {
    if (value > majority_element) {
      res = key;
    }
  }

  return res;
}

// test
const res = majorityElement([2, 2, 1, 1, 1, 2, 2]);
console.log(res);
