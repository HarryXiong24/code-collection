// 740. Delete and Earn

// You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:

// Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
// Return the maximum number of points you can earn by applying the above operation some number of times.

// Example 1:
// Input: nums = [3,4,2]
// Output: 6
// Explanation: You can perform the following operations:
// - Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
// - Delete 2 to earn 2 points. nums = [].
// You earn a total of 6 points.

// Example 2:
// Input: nums = [2,2,3,3,3,4]
// Output: 9
// Explanation: You can perform the following operations:
// - Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
// - Delete a 3 again to earn 3 points. nums = [3].
// - Delete a 3 once more to earn 3 points. nums = [].
// You earn a total of 9 points.

export function deleteAndEarn(nums: number[]): number {
  const points: Record<number, number> = {};
  let maxNumber: number = 0;

  // Precompute how many points we gain from taking an element
  nums.forEach((num) => {
    points[num] = (points[num] || 0) + num;
    maxNumber = Math.max(maxNumber, num);
  });

  const dp: number[] = new Array(maxNumber + 1).fill(0);
  dp[1] = points[1] || 0;

  for (let num = 2; num < dp.length; num++) {
    // Apply recurrence relation
    dp[num] = Math.max(dp[num - 1], (dp[num - 2] || 0) + (points[num] || 0));
  }

  return dp[maxNumber];
}

// test
const res = deleteAndEarn([2, 2, 3, 3, 3, 4]);
console.log(res);
