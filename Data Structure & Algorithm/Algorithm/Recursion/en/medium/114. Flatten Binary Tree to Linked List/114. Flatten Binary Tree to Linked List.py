# 114. Flatten Binary Tree to Linked List

# Given the root of a binary tree, flatten the tree into a "linked list":

# The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
# The "linked list" should be in the same order as a pre-order traversal of the binary tree.
 
# Example 1:
# Input: root = [1,2,5,3,4,null,6]
# Output: [1,null,2,null,3,null,4,null,5,null,6]

# Example 2:
# Input: root = []
# Output: []

# Example 3:
# Input: root = [0]
# Output: [0]


from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        record = []
        
        def pre_order(node: Optional[TreeNode]):
            if not node:
                return None
              
            record.append(node.val)
            pre_order(node.left)
            pre_order(node.right)   
            
        pre_order(root)
        len(record) > 0 and record.pop(0)
        
        def build_tree(node: Optional[TreeNode]):
            if len(record) == 0:
                return;
            
            node.left = None;
            node.right = TreeNode(record.pop(0))
            build_tree(node.right)   
            
        build_tree(root)    
            