# 归并排序

# 思路：
# 将两个或两个以上的有序表合并成一个新的有序表
# 即把待排序列分成若干个子序列，每个子序列都是有序的
# 然后再把有序的子序列合并成整体有序序列
# 平均时间复杂度 O(nlogn)，空间复杂度 O(n)

from typing import List


def merge(left: List[int], right: List[int]) -> List[int]:
    result = []
    # 合并有序列表
    while len(left) > 0 and len(right) > 0:
        if left[0] < right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    result = result + left + right
    return result


# 对数组进行拆分
def mergeSort(nums: List[int]) -> List[int]:
    # 当数组只有一个元素的时候就返回该数组
    if len(nums) == 1:
        return nums
    # 否则把数组分成左右两部分
    middle = len(nums) // 2
    left = nums[0:middle]
    right = nums[middle:]
    # 对左右两边进行拆分后进行归并排序
    return merge(mergeSort(left), mergeSort(right))


# test
arr = [10, 1, 3, 2, 9, 1, 5, 6]
res = mergeSort(arr)
print(res)