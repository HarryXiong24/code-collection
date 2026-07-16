from typing import List


def binarySearch(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if target > nums[mid]:
            left = mid + 1
        elif target < nums[mid]:
            right = mid - 1
        else:
            return mid

    return -1


# test
res = binarySearch([-1, 0, 3, 5, 9, 12], 9)
print(res)
