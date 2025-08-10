# 719. Find K-th Smallest Pair Distance

# The distance of a pair of integers a and b is defined as the absolute difference between a and b.

# Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.

# Example 1:
# Input: nums = [1,3,1], k = 1
# Output: 0
# Explanation: Here are all the pairs:
# (1,3) -> 2
# (1,1) -> 0
# (3,1) -> 2
# Then the 1st smallest distance pair is (1,1), and its distance is 0.

# Example 2:
# Input: nums = [1,1,1], k = 2
# Output: 0

# Example 3:
# Input: nums = [1,6,1], k = 3
# Output: 5

from heapq import heapify, heappop, heappush
from typing import List


class Solution:
    def smallestDistancePair(self, nums: List[int], k: int) -> int:
        n = len(nums)
        nums.sort()
        heap = [(nums[i + 1] - nums[i], i, i + 1) for i in range(n - 1)]
        heapify(heap)

        for _ in range(k):
            d, root, nei = heappop(heap)
            if nei + 1 < n:
                heappush(heap, (nums[nei + 1] - nums[root], root, nei + 1))

        return d

    def smallestDistancePairBetter(self, nums, k):
        nums.sort()
        low = 0
        high = nums[-1] - nums[0]
        while low <= high:
            mid = (low + high) // 2
            count = 0
            j = 0
            for i in range(0, len(nums)):
                while j < len(nums) and nums[j]-nums[i] <= mid:
                    j = j + 1
                count = count + (j - i - 1)
            if count >= k:
                high = mid - 1
            else:
                low = mid + 1

        return low


# test
solution = Solution()
res = solution.smallestDistancePair([1, 6, 1], 3)
res1 = solution.smallestDistancePairBetter([1, 6, 1], 3)
print(res)
print(res1)
