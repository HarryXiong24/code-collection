from typing import List


def selectionSort(nums: List[int]):
    for i in range(len(nums)):
        minVal = i
        for j in range(i + 1, len(nums)):
            if nums[minVal] > nums[j]:
                minVal = j

        temp = nums[i]
        nums[i] = nums[minVal]
        nums[minVal] = temp


# test
array = [10, 1, 3, 2, 9, 1, 5, 6]
selectionSort(array)
print(array)