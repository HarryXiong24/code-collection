# DESCRIPTION
# Given an array of integers, find the next greater element for each element in the array. The next greater element of an element x is the first element to the right of x that is greater than x. If there is no such element, then the next greater element is -1.

# Example
# Input: [2, 1, 3, 2, 4, 3]
# Output: [3, 3, 4, 4, -1, -1]


def nextGreaterElement(nums) -> list[int]:
    result = len(nums) * [-1]
    monotonic_stack = []

    for index, items in enumerate(nums):
        while (
            len(monotonic_stack) > 0
            and items > nums[monotonic_stack[len(monotonic_stack) - 1]]
        ):
            top = monotonic_stack.pop()
            result[top] = items
        monotonic_stack.append(index)

    return result


# test
res = nextGreaterElement([2, 1, 3, 2, 4, 3])
print(res)  # Output: [3, 3, 4, 4, -1, -1]
