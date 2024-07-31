from typing import List


# Find Lower bound
def binarySearch(nums: List[int], target: int) -> int:
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
