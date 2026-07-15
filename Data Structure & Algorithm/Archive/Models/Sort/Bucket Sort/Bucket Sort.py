from typing import List


def bucketSort(nums: List[int], bucket_number: int) -> List[int]:
    minVal = min(nums)
    mapper = 0
    if minVal < 0:
        mapper = abs(0 - minVal)
    else:
        mapper = 0

    for i in range(len(nums)):
        nums[i] = nums[i] + mapper

    maxVal = max(nums)
    buckets = [[] for _ in range(bucket_number)]
    bucket_size = (maxVal - minVal) // bucket_number

    for item in nums:
        index = (item - minVal) // bucket_size
        if index >= bucket_number:
            buckets[bucket_number - 1].append(item)
        else:
            buckets[index].append(item)

    for bucket in buckets:
        bucket.sort()

    sortedArray = [num for bucket in buckets for num in bucket]

    for i in range(len(sortedArray)):
        sortedArray[i] = sortedArray[i] - mapper

    return sortedArray


# test
array = [23, 25, 21, -12, 19, 17, -5, 7, -5]
res = bucketSort(array, 5)
print(res)