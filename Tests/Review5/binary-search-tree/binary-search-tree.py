# Binary Search Tree

from typing import List


class TreeNode:

    def __init__(self, val: float, left=None, right=None) -> None:
        self.val: float = val
        self.left: TreeNode | None = left
        self.right: TreeNode | None = right


class BinarySearchTree:
    def __init__(self, node: TreeNode | None) -> None:
        self.root = node

    def searchNode(self, value: float) -> bool:
        def recursive(node: TreeNode | None):
            if not node:
                return False

            if value < node.val:
                return recursive(node.left)
            elif value > node.val:
                return recursive(node.right)
            else:
                return True

        return recursive(self.root)

    def insertNode(self, value: float) -> bool:
        if not self.root:
            self.root = TreeNode(value)
            return True

        def recursion(node: TreeNode):
            if value < node.val:
                if not node.left:
                    node.left = TreeNode(value)
                    return True
                return recursion(node.left)
            elif value > node.val:
                if not node.right:
                    node.right = TreeNode(value)
                    return True
                return recursion(node.right)
            else:
                return False

        return recursion(self.root)

    def deleteNode(self, value: float) -> bool:
        if not self.root:
            return False

        def recursion(node: TreeNode, parent: TreeNode):
            if not node:
                return False

            if value < node.val:
                return recursion(node.left, node)
            elif value > node.val:
                return recursion(node.right, node)
            else:
                if not node.left or not node.right:
                    child = node.left if node.left else node.right
                    if parent == None:
                        self.root = child
                    if parent.left == node:
                        parent.left = child
                    else:
                        parent.right = child
                else:
                    current = node.right
                    parent = node

                    while current.left:
                        parent = current
                        current = current.left

                    node.val = current.val
                    if parent.left == current:
                        parent.left = current.right
                    else:
                        parent.right = current.right

                return True

        return recursion(self.root, None)

    def preorder(self):
        res: List[float] = []

        def recursive(node: TreeNode | None):
            if not node:
                return
            res.append(node.val)
            recursive(node.left)
            recursive(node.right)

        recursive(self.root)
        return res

    def inorder(self):
        res: List[float] = []

        def recursive(node: TreeNode | None):
            if not node:
                return
            recursive(node.left)
            res.append(node.val)
            recursive(node.right)

        recursive(self.root)
        return res

    def postorder(self):
        res: List[float] = []

        def recursive(node: TreeNode | None):
            if not node:
                return
            recursive(node.left)
            recursive(node.right)
            res.append(node.val)

        recursive(self.root)
        return res


# test
tree = BinarySearchTree(None)
tree.insertNode(8)
tree.insertNode(14)
tree.insertNode(10)
tree.insertNode(13)
tree.insertNode(3)
tree.insertNode(1)
tree.insertNode(6)
tree.insertNode(4)
tree.insertNode(7)
insert_res1 = tree.preorder()  # [8, 3, 1, 6, 4, 7, 14, 10, 13]
print(insert_res1)
search_res1 = tree.searchNode(14)  # true
print(search_res1)
search_res2 = tree.searchNode(5)  # false
print(search_res2)

tree.deleteNode(8)
delete_res1 = tree.preorder()  # [10, 3, 1, 6, 4, 7, 14, 13]
print(delete_res1)

tree.deleteNode(3)
delete_res2 = tree.preorder()  # [10, 4, 1, 6, 7, 14, 13]
print(delete_res2)
