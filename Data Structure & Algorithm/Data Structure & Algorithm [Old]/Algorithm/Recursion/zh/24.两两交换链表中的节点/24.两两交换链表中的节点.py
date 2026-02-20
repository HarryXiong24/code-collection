# 24 两两交换链表中的节点

# 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
# 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
# 输入：head = [1,2,3,4]
# 输出：[2,1,4,3]

# Definition for singly-linked list.
from typing import Optional


class ListNode:

    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:

    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head == None or head.next == None:
            return head
        # 递归前
        next = head.next
        # 递归中
        head.next = self.swapPairs(next.next)
        # 递归后
        next.next = head
        return next
