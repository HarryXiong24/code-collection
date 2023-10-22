# 378. Kth Smallest Element in a Sorted Matrix

# Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.

# Note that it is the kth smallest element in the sorted order, not the kth distinct element.

# You must find a solution with a memory complexity better than O(n2).

# Example 1:
# Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
# Output: 13
# Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13

# Example 2:
# Input: matrix = [[-5]], k = 1
# Output: -5

from typing import List


class Solution:

    def heapify(self, nums: List[int], length, current_index):
        max_index = current_index
        left_index = 2 * current_index + 1
        right_index = 2 * current_index + 2

        if left_index < length and nums[max_index] < nums[left_index]:
            max_index = left_index
        if right_index < length and nums[max_index] < nums[right_index]:
            max_index = right_index

        if current_index != max_index:
            temp = nums[current_index]
            nums[current_index] = nums[max_index]
            nums[max_index] = temp
            self.heapify(nums, length, max_index)

    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        res = []
        for item in matrix:
            res = res + item

        for i in range(len(res) // 2, -1, -1):
            self.heapify(res, len(res), i)

        for i in range(len(res)-1, -1, -1):
            temp = res[i]
            res[i] = res[0]
            res[0] = temp
            self.heapify(res, i, 0)

        return res[k-1]


# test
solution = Solution()
res = solution.kthSmallest([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8)
print(res)
