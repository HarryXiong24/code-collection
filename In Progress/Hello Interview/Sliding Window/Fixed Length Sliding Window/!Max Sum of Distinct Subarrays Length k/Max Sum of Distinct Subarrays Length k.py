# DESCRIPTION (inspired by Leetcode.com)
# Given an integer array nums and an integer k, write a function to identify the highest possible sum of a subarray within nums, where the subarray meets the following criteria: its length is k, and all of its elements are unique. If no such subarray exists, return 0.

# Example 1:
# Input:
# nums = [3, 2, 2, 3, 4, 6, 7, 7, -1]
# k = 4
# Output: 20
# Explanation: The subarrays of nums with length 4 are:
# [3, 2, 2, 3] # elements 3 and 2 are repeated.
# [2, 2, 3, 4] # element 2 is repeated.
# [2, 3, 4, 6] # meets the requirements and has a sum of 15.
# [3, 4, 6, 7] # meets the requirements and has a sum of 20.
# [4, 6, 7, 7] # element 7 is repeated.
# [6, 7, 7, -1] # element 7 is repeated.
# We return 20 because it is the maximum subarray sum of all the subarrays that meet the conditions.

# Example 2:
# Input:
# nums = [5, 5, 5, 5, 5]
# k = 3
# Output: 0
# Explanation: Every subarray of length 3 contains duplicate elements, so no valid subarray exists. Return 0.

# Time Complexity: O(n)
# Space Complexity: O(k)


class Solution:
    def maxSum(self, nums: list[int], k: int) -> int:
        # Your code goes here
        max_sum = float("-inf")
        window_sum = 0
        counter = dict({})

        start = 0
        for end in range(0, len(nums)):
            window_sum += nums[end]

            if nums[end] in counter:
                counter[nums[end]] = counter[nums[end]] + 1
            else:
                counter[nums[end]] = 1

            if end - start + 1 == k:
                if len(counter) == k:
                    max_sum = max(max_sum, window_sum)

                window_sum -= nums[start]
                counter[nums[start]] -= 1
                if counter[nums[start]] == 0:
                    del counter[nums[start]]

                start += 1

        if max_sum == float("-inf"):
            return 0

        return max_sum


# test
res = Solution().maxSum([4, 2, 4, 5, 6], 4)
print(res)
