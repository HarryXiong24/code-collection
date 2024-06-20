import random


# O(n^2)
def selection_sort(lyst):
    """选择排序"""
    i = 0
    while i < len(lyst) - 1:
        min_index = i
        j = i + 1
        while j < len(lyst):
            if lyst[j] < lyst[min_index]:
                min_index = j
            j += 1
        if i != min_index:
            lyst[i], lyst[min_index] = lyst[min_index], lyst[i]
        i += 1


# O(n^2)
def bubble_sort(lyst):
    """冒泡排序"""
    # 外层循环len(lyst) - 1, j最大能取到倒数第二个值, j+1取到最后一个
    for i in range(1, len(lyst)):
        for j in range(0, len(lyst) - i):
            if lyst[j] > lyst[j + 1]:
                lyst[j], lyst[j + 1] = lyst[j + 1], lyst[j]

# O(n^2)
def insertion_sort(lyst):
    """插入排序"""
    # i=1, 表示假定 lyst[0] 为有序数据, 下一个为无序数据
    for i in range(1, len(lyst)):
        item = lyst[i]
        j = i - 1
        while j >= 0:
            # 如果待排数据小于lyst[j], 就往后覆盖赋值
            if item < lyst[j]:
                lyst[j + 1] = lyst[j]
                j -= 1
            # 因为lyst[j] 是当前有序数值中最大的数, 如果比它还大就直接跳出
            else:
                break
        # j 多减了1
        lyst[j + 1] = item
 
# O(nlogn)
def quick_sort(lyst, left, right):
    """快速排序"""
    middle = (left + right) // 2
    # 基准点
    pivot = lyst[middle]
    if left < right:
        # 边界
        boundary = left
        # 将基准点与最后一个点交换
        lyst[middle], lyst[right] = lyst[right], lyst[middle]
        # 遍历边界右边, 是否小于基准点
        for index in range(left, right):
            if lyst[index] < pivot:
                lyst[boundary], lyst[index] = lyst[index], lyst[boundary]
                boundary += 1
        lyst[boundary], lyst[right] = lyst[right], lyst[boundary]
        # 左右子列表
        quick_sort(lyst, left, boundary - 1)
        quick_sort(lyst, boundary + 1, right)


def get_lyst(lyst):
    lyst.clear()
    for i in range(20):
        lyst.append(random.randint(1, 20))



def main():
    lyst = []
    print("selection_sort:")
    get_lyst(lyst)
    print(lyst)
    selection_sort(lyst)
    print(lyst)

    print("\nbubble_sort:")
    get_lyst(lyst)
    print(lyst)
    bubble_sort(lyst)
    print(lyst)

    print("\ninsertion_sort:")
    get_lyst(lyst)
    print(lyst)
    insertion_sort(lyst)
    print(lyst)

    print("\nquick_sort:")
    get_lyst(lyst)
    print(lyst)
    quick_sort(lyst, 0, len(lyst) - 1)
    print(lyst)


if __name__ == '__main__':
    main()