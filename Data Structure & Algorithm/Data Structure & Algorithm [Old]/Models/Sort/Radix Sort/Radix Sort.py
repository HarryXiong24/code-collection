from typing import List


def customizedCountingSort(nums: List[int],
                           digit: int,
                           count_volume: int = 10):
    countArray = [0] * count_volume

    for item in nums:
        index = (item // digit) % 10
        countArray[index] = countArray[index] + 1

    summation = 0
    temp = 0
    for i in range(len(countArray)):
        summation = summation + temp
        temp = countArray[i]
        countArray[i] = summation

    sortedArray = [0] * len(nums)

    for i in range(len(nums)):
        current_digit = (nums[i] // digit) % 10
        index = countArray[current_digit]
        value = nums[i]
        sortedArray[index] = value
        countArray[current_digit] = countArray[current_digit] + 1

    for i in range(len(nums)):
        nums[i] = sortedArray[i]


def radixSort(nums: List[int]) -> List[int]:
    minVal = min(nums)
    mapper = 0
    if minVal < 0:
        mapper = abs(0 - minVal)
    else:
        mapper = 0

    for i in range(len(nums)):
        nums[i] = nums[i] + mapper

    maxVal = max(nums)
    digit = 1
    while digit <= maxVal:
        customizedCountingSort(nums, digit, 10)
        digit = digit * 10

    for i in range(len(nums)):
        nums[i] = nums[i] - mapper

    return nums


# test
array = [831, 443, 256, -336, 736, -907, 3, 21323, 54]
res = radixSort(array)
print(res)
