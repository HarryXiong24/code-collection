# 直接插入排序

# 思路：
# 在要排序的数组中，假设前面（n-1）位已经排好序了
# 然后把第 n 个数插入到前面的有序区中，也就实现了 n 个数排序
# 如此反复循环，知道数组排序完毕
# 平均时间复杂度 O(n^2)，空间复杂度 O(1)

from typing import List


def directInsertSort(nums: List[int]) -> List[int]:
    length = len(nums)
    for i in range(1, length):
        now_value = nums[i]
        for j in range(i - 1, -1, -1):
            if now_value < nums[j]:
                nums[j + 1] = nums[j]
                if j == 0:
                    nums[j] = now_value
            else:
                nums[j + 1] = now_value
                break
    return nums


# test
arr = [10, 1, 3, 2, 9, 1, 5, 6]
res = directInsertSort([10, 1, 3, 2, 9, 1, 5, 6])
print(res)
