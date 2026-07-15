"""
链表结构的节点类
"""

class Node(object):
    def __init__(self, data, next=None):
        self.data = data
        self.next = next