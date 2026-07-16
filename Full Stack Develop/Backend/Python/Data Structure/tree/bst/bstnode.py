"""
File: bstnode.py
"""

class BSTNode(object):
    """树节点"""

    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right