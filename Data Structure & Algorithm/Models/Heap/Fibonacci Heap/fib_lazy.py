from __future__ import annotations
from typing import List


class FibNodeLazy:
    def __init__(self, val: int):
        self.val: int = val
        self.parent: FibNodeLazy = None
        self.children: List[FibNodeLazy] = []
        self.flag: bool = False
        self.isAvailable: bool = False

    def get_value_in_node(self):
        return self.val

    def get_children(self):
        return self.children

    def get_flag(self):
        return self.flag

    def __eq__(self, other: FibNodeLazy):
        return self.val == other.val


class FibHeapLazy:
    def __init__(self):
        # you may define any additional member variables you need
        self.roots: List[FibNodeLazy] = []
        self.size: int = 0
        self.min = None

    def get_roots(self) -> list:
        return self.roots

    def insert(self, val: int) -> FibNodeLazy:
        new_node = FibNodeLazy(val)
        self.roots.append(new_node)
        self.size += 1
        self.min = self.find_min_lazy()
        return new_node

    def delete_min_lazy(self) -> None:
        if not self.roots or self.min is None:
            return

        # remove the min node from the root l
        if not self.min.isAvailable:
            self.min.isAvailable = True
        else:
            self.min = self.find_min_lazy()
            self.min.isAvailable = True

        self.size -= 1

    def find_min_lazy(self) -> FibNodeLazy:
        for root in self.roots:
            self.destroy_vacant_nodes(root)

        new_roots = self.roots.copy()
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

        self.update_min_node()
        return self.min

    def destroy_vacant_nodes(self, node: FibNodeLazy) -> None:
        if node is None or not node.isAvailable:
            return

        if node in self.roots:
            self.roots.remove(node)

        for child in node.children:
            if child is not None:
                self.roots.append(child)
            else:
                self.destroy_vacant_nodes(child)

    def decrease_priority(self, node: FibNodeLazy, new_val: int) -> None:
        node.val = new_val
        if node in self.roots:
            if node.val < self.min.val:
                self.min = self.find_min_lazy()
            return

        self.promote(node)

        self.min = self.find_min_lazy()

    def combine(self, root1: FibNodeLazy, root2: FibNodeLazy) -> FibNodeLazy:
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

    def promote(self, node: FibNodeLazy) -> None:
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

    def print_fib_node(self, obj: List[FibNodeLazy]) -> None:
        if isinstance(obj, list):
            for item in obj:
                self.print_fib_node(item)
        else:
            print(obj.val)
            for child in obj.children:
                self.print_fib_node(child)
