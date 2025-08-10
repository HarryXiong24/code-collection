from typing import List


def merge(left: List[int], right: List[int]):
    result = []

    while (len(left) > 0 and len(right) > 0):
        if left[0] < right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))

    return result + left + right


def mergeSort(nums: List[int]) -> List[int]:
    if len(nums) <= 1:
        return nums

    middle = len(nums) // 2
    left = nums[:middle]
    right = nums[middle:]

    return merge(mergeSort(left), mergeSort(right))


# test
res = mergeSort([10, 1, 3, 2, 9, 1, 5, 6])
print(res)
