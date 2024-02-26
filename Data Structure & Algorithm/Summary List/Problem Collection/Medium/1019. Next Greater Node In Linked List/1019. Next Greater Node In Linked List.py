# 1019. Next Greater Node In Linked List

# For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.

# Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

# Example 1:
# Input: head = [2,1,5]
# Output: [5,5,0]

# Example 2:
# Input: head = [2,7,4,3,5]
# Output: [7,0,5,5,0]

# Definition for singly-linked list.
from typing import List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


# O(n)
class Solution:
    def nextLargerNodes(self, head: Optional[ListNode]) -> List[int]:
        if not head:
            return []

        arr = []
        temp = head
        while temp:
            arr.append(temp.val)
            temp = temp.next

        stack = []
        res = [0] * len(arr)
        for i in range(0, len(arr)):
            while stack and arr[stack[-1]] < arr[i]:
                smaller = stack.pop()
                res[smaller] = arr[i]
            stack.append(i)

        return res
