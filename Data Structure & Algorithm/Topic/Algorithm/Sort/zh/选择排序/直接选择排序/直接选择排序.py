# 直接选择排序

# 思路：
# 在要排序的数组中，选择最小的数与第一位交换
# 然后在剩下的数中找出最小的数与第二位交换
# 如此循环到倒数第二个数与倒数第一个数比较为止
# 平均时间复杂度 O(n^2)，空间复杂度 O(1)

from typing import List


def chooseSort(nums: List[int]) -> List[int]:
    length = len(nums)
    min_index = 0
    for i in range(0, length):
        min_index = i
        for j in range(i + 1, length):
            if nums[min_index] > nums[j]:
                min_index = j
        temp = nums[i]
        nums[i] = nums[min_index]
        nums[min_index] = temp
    return nums


# test
arr = [10, 1, 3, 2, 9, 1, 5, 6]
res = chooseSort(arr)
print(res)
