from typing import Any, List


class TestNode:

    def __init__(self, value: Any = 0, neighbors: List = []):
        self.value: Any = value
        self.neighbors: List[TestNode] = neighbors


def DFS_Recursive(root: TestNode):

    def recursive(node: TestNode):
        if node == None:
            return
        print(node.value)
        for item in node.neighbors:
            recursive(item)

    recursive(root)


# test
root = TestNode(1, [])
node2 = TestNode(2, [])
node3 = TestNode(3, [])
node4 = TestNode(4, [])
node5 = TestNode(5, [])
node6 = TestNode(6, [])
node7 = TestNode(7, [])

root.neighbors.append(node2)
root.neighbors.append(node3)
node2.neighbors.append(node4)
node2.neighbors.append(node5)
node3.neighbors.append(node6)
node6.neighbors.append(node7)

DFS_Recursive(root)
