# 373. Find K Pairs with Smallest Sums

# You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.

# Define a pair (u, v) which consists of one element from the first array and one element from the second array.

# Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

# Example 1:
# Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
# Output: [[1,2],[1,4],[1,6]]
# Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

# Example 2:
# Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
# Output: [[1,1],[1,1]]
# Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

import heapq
from typing import List


class Solution:
    def kSmallestPairs(
        self, nums1: List[int], nums2: List[int], k: int
    ) -> List[List[int]]:
        if not nums1 or not nums2:
            return []

        heap = []
        result = []

        # 初始化最小堆，存入 (nums1[i] + nums2[0], nums1[i], nums2[0], index_in_nums2)
        for i in range(min(len(nums1), k)):  # 只取前 k 个，避免不必要的计算
            heapq.heappush(heap, (nums1[i] + nums2[0], nums1[i], nums2[0], 0))

        while heap and len(result) < k:
            _, num1, num2, index = heapq.heappop(heap)
            result.append([num1, num2])

            if index < len(nums2) - 1:
                heapq.heappush(
                    heap, (num1 + nums2[index + 1], num1, nums2[index + 1], index + 1)
                )

        return result
