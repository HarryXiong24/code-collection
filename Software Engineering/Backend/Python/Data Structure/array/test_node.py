"""
链表测试
"""

from node import Node

head = None

# 创建链表
for count in range(1, 6):
    head = Node(count, head)

# 输出链表
while head != None:
    print(head.data)
    head = head.next

