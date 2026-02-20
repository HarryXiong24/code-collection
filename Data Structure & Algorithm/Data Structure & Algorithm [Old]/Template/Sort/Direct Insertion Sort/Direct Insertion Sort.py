from typing import List


def insertSort(nums: List[int]):
    for i in range(1, len(nums)):
        current = nums[i]
        j = i - 1
        while (j >= 0 and nums[j] > current):
            nums[j + 1] = nums[j]
            j = j - 1

        nums[j + 1] = current


# test
array = [10, 1, 3, 2, 9, 1, 5, 6]
insertSort(array)
print(array)
