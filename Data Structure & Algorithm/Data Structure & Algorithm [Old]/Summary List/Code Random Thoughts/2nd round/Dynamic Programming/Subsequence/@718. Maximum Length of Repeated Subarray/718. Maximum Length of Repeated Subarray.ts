// 718. Maximum Length of Repeated Subarray

// Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.

// Example 1:
// Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
// Output: 3
// Explanation: The repeated subarray with maximum length is [3,2,1].

// Example 2:
// Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
// Output: 5
// Explanation: The repeated subarray with maximum length is [0,0,0,0,0].

export function findLength(nums1: number[], nums2: number[]): number {
  // 以下标 i - 1 为结尾的 A，和以下标 j - 1 为结尾的 B，最长重复子数组长度为 dp[i][j]
  // 特别注意: 以下标 i - 1 为结尾的 A, 标明一定是 以 A[i-1] 为结尾的字符串
  const dp: number[][] = new Array(nums1.length + 1).fill(0).map(() => new Array(nums2.length + 1).fill(0));
  let resMax: number = 0;

  // 如果不从 i - 1，j - 1 开始表示，dp[0][j] 和 dp[i][0] 就要在初始化的时候遍历一边确定初始值

  for (let i = 1; i <= nums1.length; i++) {
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        resMax = Math.max(resMax, dp[i][j]);
      }
    }
  }

  return resMax;
}

// test
const res = findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]);
console.log(res);
