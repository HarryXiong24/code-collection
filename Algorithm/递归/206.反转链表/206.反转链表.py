# 206 反转链表

# 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
# head = [1,2,3,4,5]
# [5,4,3,2,1]

# Definition for singly-linked list.
from typing import Optional


class ListNode:

    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:

    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head == None or head.next == None:
            return head
        newLink = self.reverseList(head.next)
        temp = head.next
        temp.next = head
        head.next = None
        return newLink
