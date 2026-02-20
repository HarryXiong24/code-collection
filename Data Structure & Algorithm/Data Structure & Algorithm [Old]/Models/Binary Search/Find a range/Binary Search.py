from typing import List


# Find a range
class Solution:

    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1

        while left + 1 < right:
            mid = left + (right - left) // 2
            if nums[mid] < target:
                left = mid
            elif nums[mid] > target:
                right = mid
            else:
                return mid

        if nums[left] == target:
            return left
        if nums[right] == target:
            return right

        return -1


# test
solution = Solution()
res = solution.search([-1, 0, 3, 5, 9, 12], 9)
print(res)
