# 238. Product of Array Except Self

# Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

# The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

# You must write an algorithm that runs in O(n) time and without using the division operation.

# Example 1:
# Input: nums = [1,2,3,4]
# Output: [24,12,8,6]

# Example 2:
# Input: nums = [-1,1,0,-3,3]
# Output: [0,0,9,0,0]

from typing import List


# T: O(n)
# S: O(1)
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        total_production = 1
        exist_zero = []

        for i in range(0, len(nums)):
            if nums[i] != 0:
                total_production *= nums[i]
            else:
                exist_zero.append(i)

        if len(exist_zero) == 1:
            for i in range(0, len(nums)):
                if nums[i] != 0:
                    nums[i] = 0
                else:
                    nums[i] = total_production
        elif len(exist_zero) > 1:
            for i in range(0, len(nums)):
                nums[i] = 0
        else:
            for i in range(0, len(nums)):
                temp = nums[i]
                nums[i] = total_production // temp

        return nums

    def productExceptSelfBetter(self, nums: List[int]) -> List[int]:

        # The length of the input array
        length = len(nums)

        # The left and right arrays as described in the algorithm
        L, R, answer = [0] * length, [0] * length, [0] * length

        # L[i] contains the product of all the elements to the left
        # Note: for the element at index '0', there are no elements to the left,
        # so the L[0] would be 1
        L[0] = 1
        for i in range(1, length):

            # L[i - 1] already contains the product of elements to the left of 'i - 1'
            # Simply multiplying it with nums[i - 1] would give the product of all
            # elements to the left of index 'i'
            L[i] = nums[i - 1] * L[i - 1]

        # R[i] contains the product of all the elements to the right
        # Note: for the element at index 'length - 1', there are no elements to the right,
        # so the R[length - 1] would be 1
        R[length - 1] = 1
        for i in reversed(range(length - 1)):

            # R[i + 1] already contains the product of elements to the right of 'i + 1'
            # Simply multiplying it with nums[i + 1] would give the product of all
            # elements to the right of index 'i'
            R[i] = nums[i + 1] * R[i + 1]

        # Constructing the answer array
        for i in range(length):
            # For the first element, R[i] would be product except self
            # For the last element of the array, product except self would be L[i]
            # Else, multiple product of all elements to the left and to the right
            answer[i] = L[i] * R[i]

        return answer


# test
solution = Solution()
res = solution.productExceptSelf([1, 2, 3, 4])  # [24,12,8,6]
res1 = solution.productExceptSelf([-1, 1, 0, -3, 3])  # [24,12,8,6]
print(res)
print(res1)
