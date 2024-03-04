from typing import List


class TestNode:

    def __init__(self, value: int = 0, neighbors: List = []):
        self.value: int = value
        self.neighbors: List[TestNode] = neighbors


def BFS(node: TestNode):
    if not node:
        return

    queue = [node]
    layer = 0

    while len(queue):
        size = len(queue)
        for _ in range(0, size):
            current = queue.pop(0)
            print(current.value)
            for neighbor in current.neighbors:
                queue.append(neighbor)
            layer += 1


def DFS_Stack(node: TestNode):
    if not node:
        return

    stack = [node]

    while len(stack):
        current = stack.pop()
        print(current.value)
        if len(node.neighbors) > 0:
            for child in current.neighbors:
                stack.append(child)


def DFS_Recursive(node: TestNode):

    def recursive(node: TestNode):
        if not node:
            return

        print(node.value)
        if len(node.neighbors) > 0:
            for child in node.neighbors:
                recursive(child)

    recursive(node)
