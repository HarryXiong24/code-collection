# explanations for member functions are provided in requirements.py
# each file that uses a Zip Tree should import it from this file.

import random
from typing import Optional, TypeVar

KeyType = TypeVar("KeyType")
ValType = TypeVar("ValType")


class TreeNode:
    def __init__(self, key: KeyType, val: ValType, rank: int):
        self.key: KeyType = key
        self.val: ValType = val
        self.rank: int = rank
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None

    def __str__(self):
        return f"TreeNode(key={self.key}, val={self.val}, rank={self.rank}, left={self.left}, right={self.right}\n)\n---"


class ZipTree:
    def __init__(self):
        self.root: Optional[TreeNode] = None
        self.size = 0

    @staticmethod
    def get_random_rank() -> int:
        "returns a random node rank, chosen independently from a geometric distribution of mean 1"
        rank = 0
        while random.randint(0, 1) == 0:  # Assuming 0 is tails and 1 is heads
            rank += 1
        return rank

    def insert(self, key: KeyType, val: ValType, rank: int = -1):
        if rank == -1:
            rank = self.get_random_rank()

        new_node: TreeNode = TreeNode(key, val, rank)

        self.root = self._insert_helper(new_node, self.root)
        self.size += 1

    def _insert_helper(self, current: TreeNode, root: TreeNode) -> TreeNode:
        if not root:
            return current

        if current.key < root.key:  # to left
            # if current is the new root
            if self._insert_helper(current, root.left) == current:
                if current.rank < root.rank:
                    root.left = current
                else:
                    root.left = current.right
                    current.right = root
                    return current
        else:  # to right
            # if current is the new root
            if self._insert_helper(current, root.right) == current:
                if current.rank <= root.rank:
                    root.right = current
                else:
                    root.right = current.left
                    current.left = root
                    return current
        return root

    def remove(self, key: KeyType):
        current = None
        temp = self.root
        while temp:
            if temp.key == key:
                current = temp
                break
            temp = temp.left if key < temp.key else temp.right
        if current:
            self.root = self._remove_helper(current, self.root)
            self.size -= 1

    def _remove_helper(self, current: KeyType, root: TreeNode) -> Optional[TreeNode]:
        if current.key == root.key:
            return self._zip(root.left, root.right)
        if current.key < root.key:
            if current.key == root.left.key:
                root.left = self._zip(root.left.left, root.left.right)
            else:
                self._remove_helper(current, root.left)
        else:
            if current.key == root.right.key:
                root.right = self._zip(root.right.left, root.right.right)
            else:
                self._remove_helper(current, root.right)
        return root

    def _zip(self, x: TreeNode, y: TreeNode) -> TreeNode:
        """zips two trees together"""
        if x is None:
            return y
        if y is None:
            return x
        if x.rank < y.rank:
            y.left = self._zip(x, y.left)
            return y
        else:
            x.right = self._zip(x.right, y)
            return x

    def find(self, key: KeyType) -> ValType:
        current = self.root
        while current:
            if current.key == key:
                return current.val
            current = current.left if key < current.key else current.right
        return None

    def get_size(self) -> int:
        return self.size

    def get_height(self) -> int:
        """returns the height of the tree."""
        if not self.root:
            return 0
        queue = [self.root]
        height = 0
        while queue:
            for _ in range(len(queue)):
                node = queue.pop(0)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            height += 1
        return height - 1

    def get_depth(self, key: KeyType):
        """returns the depth of the item with parameter key. you can assume that the item exists in the tree."""
        depth = 0
        current = self.root
        while current:
            if current.key == key:
                return depth
            current = current.left if key < current.key else current.right
            depth += 1

    def get_tree(self):
        return self.root


# feel free to define new classes/methods in addition to the above
# fill in the definitions of each required member function (above),
# and any additional member functions you define
