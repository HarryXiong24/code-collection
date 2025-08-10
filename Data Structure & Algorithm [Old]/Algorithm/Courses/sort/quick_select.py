import random
from sort_and_return import in_built_sort

def quick_select(arr: list[int], k: int, threshold: int = 10) -> int:
    if len(arr) <= threshold:
        return in_built_sort(arr, k)

    pivotIndex = random.randint(0, len(arr) - 1)
    pivot = arr[pivotIndex]
    left = []
    right = []
    mid = []

    for i in range(len(arr)):
        if arr[i] < pivot:
            left.append(arr[i])
        elif arr[i] > pivot:
            right.append(arr[i])
        else:
            mid.append(arr[i])
            
    if k <= len(left): 
        return quick_select(left, k, threshold)
    elif len(left) < k <= len(left) + len(mid):
        return pivot
    else: 
        return quick_select(right, k - len(left) - len(mid), threshold)