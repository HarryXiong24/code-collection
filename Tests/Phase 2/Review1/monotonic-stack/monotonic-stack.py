from typing import List


def nextGreaterElement(nums: List[int]) -> List[int]:
    result: List[int] = [-1] * len(nums)
    monotonicStack: List[int] = []

    for i in range(0, len(nums)):
        while (
            len(monotonicStack) > 0
            and nums[i] > nums[monotonicStack[len(monotonicStack) - 1]]
        ):
            index = monotonicStack.pop()
            result[index] = nums[i]

        monotonicStack.append(i)

    return result


# test
nums = [2, 1, 2, 4, 3]
print(nextGreaterElement(nums))
# [4, 2, 4, -1, -1]
