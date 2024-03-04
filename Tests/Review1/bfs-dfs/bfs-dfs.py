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


def DFS_Stack(node: TestNode):
    stack = [node]

    while len(stack):
        current = stack.pop()
        if current:
            pass
        if len(current.neighbors) > 0:
            for item in current.neighbors:
                stack.append(item)


def DFS_Recursive(node: TestNode):

    def recursive(n: TestNode):
        if not n:
            return
        print(n.value)
        if len(n.neighbors) > 0:
            for item in n.neighbors:
                recursive(item)

    recursive(node)
