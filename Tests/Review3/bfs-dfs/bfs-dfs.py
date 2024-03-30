from typing import List


class TestNode:

    def __init__(self, value: int = 0, neighbors: List = []):
        self.value: int = value
        self.neighbors: List[TestNode] = neighbors


def BFS(root: TestNode):
    if root:
        return

    queue: List[TestNode] = [root]
    depth = 0

    while len(queue) > 0:
        size = len(queue)
        for _ in range(size):
            current = queue.pop(0)
            print(current.value)
            for neighbor in current.neighbors:
                queue.append(neighbor)
        depth += 1

    return depth


def DFS_Stack(root: TestNode):
    if root:
        return

    stack: List[TestNode] = [root]

    while len(stack) > 0:
        current = stack.pop()
        print(current.value)
        for neighbor in current.neighbors:
            stack.append(neighbor)


def DFS_Recursive(root: TestNode):
    if root:
        return

    def recursion(node: TestNode):
        if node:
            return
        print(node.value)
        for neighbor in node.neighbors:
            recursion(neighbor)

    recursion(root)
