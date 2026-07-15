from typing import List


class TestNode:

    def __init__(self, value: int = 0, neighbors: List = []):
        self.value: int = value
        self.neighbors: List[TestNode] = neighbors


def BFS(node: TestNode):
    queue = [node]
    layer = 0

    while len(queue):
        size = len(queue)
        for _ in range(size):
            current = queue.pop(0)
            if current:
                pass
            if len(node.neighbors) > 0:
                for item in node.neighbors:
                    queue.append(item)
        layer += 1


def DFS_Stack(root: TestNode):
    if not root:
        return

    stack: List[TestNode] = [root]

    while len(stack) > 0:
        current = stack.pop()
        print(current.value)
        for neighbor in current.neighbors:
            stack.append(neighbor)


def DFS_Recursive(root: TestNode):
    if not root:
        return

    def recursion(node: TestNode):
        if not node:
            return
        print(node.value)
        for neighbor in node.neighbors:
            recursion(neighbor)

    recursion(root)
