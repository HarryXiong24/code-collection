from typing import List


# Find the Exact Value
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


# Find Lower bound
def binarySearch_lowerBound(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] <= target:
            left = mid + 1
        else:
            right = mid - 1

    if left > 0 and nums[left - 1] == target:
        return left - 1

    return -1


# Find Upper bound
def binarySearch_upperBound(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] >= target:
            right = mid - 1
        else:
            left = mid + 1

    if right < len(nums) - 1 and nums[right + 1] == target:
        return right + 1

    return -1


# test
res = binarySearch([-1, 0, 3, 5, 9, 12], 9)
print(res)

res1 = binarySearch_lowerBound([-1, 0, 3, 5, 9, 12], 9)
print(res1)

res2 = binarySearch_upperBound([-1, 0, 3, 5, 9, 12], 9)
print(res2)
