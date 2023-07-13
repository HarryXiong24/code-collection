# 572. Subtree of Another Tree

# Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

# A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

# Example 1:
# Input: root = [3,4,5,1,2], subRoot = [4,1,2]
# Output: true

# Example 2:
# Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
# Output: false

# Definition for a binary tree node.
from typing import Optional


class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:

    def isSubtree(self, root: Optional[TreeNode],
                  subRoot: Optional[TreeNode]) -> bool:

        def printTree(node, log):
            if not node:
                log.append('#')
                return
            log.append(f',{node.val},')
            printTree(node.left, log)
            printTree(node.right, log)

        root_log = []
        sub_root_log = []

        printTree(root, root_log)
        printTree(subRoot, sub_root_log)

        return ''.join(root_log).find(''.join(sub_root_log)) != -1