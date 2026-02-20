from typing import List


def shellSort(nums: List[int]) -> List[int]:
    gap = len(nums) // 2

    while (gap > 0):
        for i in range(gap, len(nums)):
            temp = nums[i]
            j = i
            while (j >= gap and nums[j - gap] > temp):
                nums[j] = nums[j - gap]
                j -= gap

            nums[j] = temp

        gap = gap // 2

    return nums


# test
res = shellSort([10, 1, 3, 2, 9, 1, 5, 6])
print(res)
