from typing import List


def quickSort(nums: List[int]) -> List[int]:
    if len(nums) <= 1:
        return nums

    pivotIndex = len(nums) // 2
    pivot = nums[pivotIndex]
    smallerArr = []
    largerArr = []
    for i in range(len(nums)):
        if i == pivotIndex:
            continue
        elif nums[i] < pivot:
            smallerArr.append(nums[i])
        else:
            largerArr.append(nums[i])

    return quickSort(smallerArr) + [pivot] + quickSort(largerArr)


# test
array = [2, 0, 2, 1, 1, 0, -3, -4]
res = quickSort(array)
print(res)
