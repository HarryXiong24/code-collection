from typing import List


def heapify(nums: List[int], length: int, current_index: int):
    largest_index = current_index
    left = 2 * current_index + 1
    right = 2 * current_index + 2

    if left < length and nums[left] > nums[largest_index]:
        largest_index = left
    if right < length and nums[right] > nums[largest_index]:
        largest_index = right

    if largest_index != current_index:
        temp = nums[current_index]
        nums[current_index] = nums[largest_index]
        nums[largest_index] = temp
        heapify(nums, length, largest_index)


def heapSort(nums: List[int]):
    # build heap
    for i in range(len(nums) // 2 - 1, -1, -1):
        heapify(nums, len(nums), i)

    # heap sort
    for i in range(len(nums) - 1, -1, -1):
        temp = nums[i]
        nums[i] = nums[0]
        nums[0] = temp
        heapify(nums, i, 0)


# test
array = [2, 0, 2, 1, 1, 0, -3, -4]
heapSort(array)
print(array)
