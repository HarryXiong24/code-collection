# 92. Reverse Linked List II

# Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

# Example 1:
# Input: head = [1,2,3,4,5], left = 2, right = 4
# Output: [1,4,3,2,5]

# Example 2:
# Input: head = [5], left = 1, right = 1
# Output: [5]

# Definition for singly-linked list.
from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummyNode = ListNode(0, head)
        leftPre = dummyNode
        cur = head

        for i in range(0, left-1):
            leftPre = cur
            cur = cur.next

        # reverse from left to right
        prev = None
        for i in range(right - left + 1):
            tempNext = cur.next
            cur.next = prev
            prev = cur
            cur = tempNext

        # update pointers
        if leftPre.next:
            leftPre.next.next = cur
        leftPre.next = prev

        return dummyNode.next
