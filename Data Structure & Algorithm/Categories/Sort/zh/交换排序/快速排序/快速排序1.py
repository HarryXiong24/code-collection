# 快速排序

# 思路：
# 选择数组中间数作为基数，并从数组中取出此基数
# 准备两个数组容器，遍历数组，逐个与基数比对，较小的放左边容器，较大的放右边容器
# 递归处理两个容器的元素，并将处理后的数据与基数按大小合并成一个数组，返回
# 平均时间复杂度 O(nlogn)，空间复杂度 O(logn)

from typing import List


def quickSort(nums: List[int]) -> List[int]:
    if len(nums) <= 1:
        return nums
    pivotIndex = len(nums) // 2
    pivot = nums[pivotIndex:pivotIndex + 1][0]
    left = []
    right = []
    nums.remove(pivot)
    for i in range(0, len(nums)):
        if nums[i] < pivot:
            left.append(nums[i])
        else:
            right.append(nums[i])

    return quickSort(left) + [pivot] + quickSort(right)


# test
arr = [10, 1, 3, 2, 9, 1, 5, 6]
res = quickSort(arr)
print(res)