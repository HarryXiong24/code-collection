from typing import List


def heapify(nums: List[int], length: int, current_index: int):
    max_index = current_index
    left_index = 2 * current_index + 1
    right_index = 2 * current_index + 2

    if left_index < length and nums[max_index] < nums[left_index]:
        max_index = left_index
    if right_index < length and nums[max_index] < nums[right_index]:
        max_index = right_index

    if max_index != current_index:
        temp = nums[max_index]
        nums[max_index] = nums[current_index]
        nums[current_index] = temp
        heapify(nums, length, max_index)


def heapSort(nums: List[int]):
    for i in range(len(nums) // 2 - 1, -1, -1):
        heapify(nums, len(nums), i)

    for i in range(len(nums) - 1, -1, -1):
        temp = nums[0]
        nums[0] = nums[i]
        nums[i] = temp
        heapify(nums, i, 0)


# test
array = [2, 0, 2, 1, 1, 0, -3, -4]
heapSort(array)
print(array)
