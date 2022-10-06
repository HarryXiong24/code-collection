# 反转数组

from typing import List


def reverse(numbers: List[int]) -> List[int]:
    left = 0
    right = len(numbers) - 1
    while left < right:
        temp = numbers[left]
        numbers[left] = numbers[right]
        numbers[right] = temp
        left = left + 1
        right = right - 1
    return numbers


# test
nums = [-1, 0, 3, 5, 9, 12]
res = reverse(nums)
print(res)