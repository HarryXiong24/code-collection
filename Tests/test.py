from typing import List


def pancake_sort(arr: List[int]) -> List[int]:
    # pass # your code goes here
    def flip(arr, k):
        left = 0
        right = k

        while left < right:
            temp = arr[left]
            arr[left] = arr[right]
            arr[right] = temp

    def findIndex(arr, num):
        print("findIndex")
        for i, val in enumerate(arr):
            if num == val:
                return i

    result = []
    print("here")
    while len(arr) > 0:  # [1, 5, 4, 3, 2] => [[2, 3, 4, 1]
        maxVal = max(arr)  # 4
        index = findIndex(arr, maxVal)  # index = 2
        print(index)
        flip(arr, index)  # arr [4, 3, 2, 1]
        print(arr)
        flip(arr, len(arr) - 1)  # [2, 3, 4, 1, 5] -> [1, 2, 3, 4]
        print("next")
        result.append(arr[-1])  # arr[-1] ? res = [5,4]
        arr.pop()  # [2, 3, 4, 1]

    return result[::-1]


res = pancake_sort([1, 5, 4, 3, 2])
print(res)
