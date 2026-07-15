from __future__ import annotations
from typing import List


class FibNode:
    def __init__(self, val: int):
        self.val: int = val
        self.parent: FibNode = None
        self.children: List[FibNode] = []
        self.flag: bool = False

    def get_value_in_node(self):
        return self.val

    def get_children(self):
        return self.children

    def get_flag(self):
        return self.flag

    def __eq__(self, other: FibNode):
        return self.val == other.val


class FibHeap:

    def __init__(self):
        """
        initializes the Fibonacci heap as an empty heap with no nodes. We have predefined a few variables for you. Feel free to use them or define your own.
        """
        # you may define any additional member variables you need
        self.roots: List[FibNode] = []
        self.size: int = 0
        self.min = None

    def get_roots(self) -> list:
        """
        will be used to check the correctness of the heap structure. It returns a list of all the root nodes in the heap.
        """
        return self.roots

    def insert(self, val: int) -> FibNode:
        """
        insert an item with the specified value to the Fibonacci heap. you want to return the node that you created.

        you can assume that the value is not already in the heap.
        """
        new_node = FibNode(val)
        self.roots.append(new_node)
        if self.min is None or new_node.val < self.min.val:
            self.min = new_node
        self.size += 1
        return new_node

    def delete_min(self) -> None:
        """
        deletes the minimum node from the Fibonacci heap. you can assume that the heap is non-empty when this is called.
        """
        if not self.roots or self.min is None:
            return

        min_node = self.find_min()
        self.roots.remove(min_node)
        for child in min_node.children:
            child.parent = None

        new_roots = self.roots.copy() + min_node.children
        record = [None] * (self.size + 1)
        # Combine trees with the same degree
        while len(new_roots) > 0:
            current = new_roots.pop()
            childCount = len(current.children)
            if record[childCount] is None:
                record[childCount] = current
            else:
                combine_tree = self.combine(current, record[childCount])
                new_roots.append(combine_tree)
                record[childCount] = None

        # Update the minimum node
        self.roots = []
        for item in record:
            if item is not None:
                self.roots.append(item)
        self.size -= 1
        self.update_min_node()

    def find_min(self) -> FibNode:
        """
        returns the node with the minimum value in the Fibonacci heap. you can assume that the heap is non-empty when this is called.
        """
        return self.min

    def decrease_priority(self, node: FibNode, new_val: int) -> None:
        """
        decreases the priority of the specified node to the new value. you can assume that the new value is less than the current value and that it will not decrease to a pre-existing priority in the heap.
        """
        node.val = new_val
        if node in self.roots:
            if node.val < self.min.val:
                self.min = node
            return

        self.promote(node)

        # update the minimum node
        self.update_min_node()

    def combine(self, root1: FibNode, root2: FibNode) -> FibNode:
        """
        Combine two trees into a new tree.
        """
        if root1.val < root2.val:
            root1.children.append(root2)
            root2.parent = root1
            return root1
        else:
            root2.children.append(root1)
            root1.parent = root2
            return root2

    def promote(self, node: FibNode) -> None:
        """
        promote the node to the root list
        """
        if node not in self.roots:
            parent = node.parent
            if parent is not None:
                parent.children.remove(node)
                node.parent = None
                self.roots.append(node)
                if parent.flag:
                    self.promote(
                        parent
                    )  # Promote the parent if it has already lost a child.
                else:
                    if (
                        parent not in self.roots
                    ):  # Only set the flag if the parent is not a root.
                        parent.flag = True

    def update_min_node(self):
        if not self.roots or len(self.roots) == 0:
            self.min = None
        else:
            self.min = min(self.roots, key=lambda x: x.val)

    def print_fib_node(self, obj: List[FibNode]) -> None:
        if isinstance(obj, list):
            for item in obj:
                self.print_fib_node(item)
        else:
            print(obj.val)
            for child in obj.children:
                self.print_fib_node(child)
