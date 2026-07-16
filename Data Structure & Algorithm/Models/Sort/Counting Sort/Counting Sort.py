from typing import List


def countingSort(nums: List[int]) -> List[int]:
    minVal = min(nums)
    mapper = 0
    if minVal < 0:
        mapper = abs(0 - minVal)
    else:
        mapper = 0

    for i in range(len(nums)):
        nums[i] = nums[i] + mapper

    maxVal = max(nums)
    countArray = [0] * (maxVal + 1)
    for i in range(len(nums)):
        countArray[nums[i]] = countArray[nums[i]] + 1

    summation = 0
    temp = 0
    for i in range(len(countArray)):
        summation = summation + temp
        temp = countArray[i]
        countArray[i] = summation

    sortedArray = [0] * len(nums)
    for i in range(len(nums)):
        index = countArray[nums[i]]
        value = nums[i]
        sortedArray[index] = value
        countArray[nums[i]] = countArray[nums[i]] + 1

    for i in range(len(sortedArray)):
        sortedArray[i] = sortedArray[i] - mapper

    return sortedArray


# test
array = [2, 0, 2, 1, 1, 0, -3, -4]
res = countingSort(array)
print(res)
