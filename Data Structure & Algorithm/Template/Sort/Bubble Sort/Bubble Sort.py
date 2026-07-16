from typing import List


def bubbleSort(nums: List[int]):
    for i in range(len(nums), 0, -1):
        for j in range(0, i - 1):
            if nums[j] > nums[j + 1]:
                temp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = temp


# test
array = [10, 1, 3, 2, 9, 1, 5, 6]
bubbleSort(array)
print(array)
