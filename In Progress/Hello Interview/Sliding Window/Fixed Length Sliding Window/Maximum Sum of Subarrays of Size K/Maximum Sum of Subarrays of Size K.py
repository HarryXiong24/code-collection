# DESCRIPTION
# Given an array of integers nums and an integer k, find the maximum sum of any contiguous subarray of size k.

# Example 1:
# Input:
# nums = [2, 1, 5, 1, 3, 2]
# k = 3
# Output: 9
# Explanation: The subarray with the maximum sum is [5, 1, 3] with a sum of 9.

# Time Complexity: O(n)
# Space Complexity: O(1)
class Solution:
    def maxSum(self, nums: list[int], k: int) -> int:
        # Your code goes here
        left = 0
        window_sum = 0

        if len(nums) < k:
            return 0

        for i in range(0, k):
            window_sum += nums[left + i]
        max_sum = window_sum

        while left + k < len(nums):
            window_sum = window_sum - nums[left] + nums[left + k]
            max_sum = max(window_sum, max_sum)
            left += 1

        return max_sum


# test
res = Solution().maxSum([2, 1, 5, 1, 3, 2], 3)
print(res)
