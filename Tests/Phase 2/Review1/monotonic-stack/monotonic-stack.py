from typing import List


def nextGreaterElement(nums: List[int]) -> List[int]:
    monotonic_stack: List[int] = []
    result: List[int] = [-1] * len(nums)

    for i in range(0, len(nums)):
        while (
            len(monotonic_stack) > 0
            and nums[i] > nums[monotonic_stack[len(monotonic_stack) - 1]]
        ):
            top = monotonic_stack.pop()
            result[top] = nums[i]
        monotonic_stack.append(i)

    return result


# test
nums = [2, 1, 2, 4, 3]
print(nextGreaterElement(nums))
# [4, 2, 4, -1, -1]
