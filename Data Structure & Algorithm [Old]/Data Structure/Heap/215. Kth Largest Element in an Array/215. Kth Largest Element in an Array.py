# 215. Kth Largest Element in an Array

# Given an integer array nums and an integer k, return the kth largest element in the array.

# Note that it is the kth largest element in the sorted order, not the kth distinct element.

# Can you solve it without sorting?

#  Example 1:
# Input: nums = [3,2,1,5,6,4], k = 2
# Output: 5

# Example 2:
# Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
# Output: 4

from typing import List


class Solution:

    def heapify(self, heap: List[int], length: int, current_index: int):
        max_index = current_index
        left_index = 2 * current_index + 1
        right_index = 2 * current_index + 2

        if left_index < length and heap[max_index] < heap[left_index]:
            max_index = left_index
        if right_index < length and heap[max_index] < heap[right_index]:
            max_index = right_index

        if max_index != current_index:
            temp = heap[max_index]
            heap[max_index] = heap[current_index]
            heap[current_index] = temp
            self.heapify(heap, length, max_index)

    def findKthLargest(self, nums: List[int], k: int) -> int:

        for i in range(len(nums) // 2 - 1, -1, -1):
            self.heapify(nums, len(nums), i)

        for i in range(len(nums) - 1, -1, -1):
            temp = nums[i]
            nums[i] = nums[0]
            nums[0] = temp
            self.heapify(nums, i, 0)

        return nums[len(nums)-k]


# test
solution = Solution()
res1 = solution.findKthLargest([3, 2, 1, 5, 6, 4], 2)
res2 = solution.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)
print(res1)
print(res2)
