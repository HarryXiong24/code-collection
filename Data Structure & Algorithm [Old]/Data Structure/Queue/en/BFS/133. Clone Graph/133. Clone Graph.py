# 133. Clone Graph

# Given a reference of a node in a connected undirected graph.
# Return a deep copy (clone) of the graph.
# Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

# class Node {
#     public int val;
#     public List<Node> neighbors;
# }

# Test case format:
# For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
# An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
# The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

# Example 1:
# Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
# Output: [[2,4],[1,3],[2,4],[1,3]]
# Explanation: There are 4 nodes in the graph.
# 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
# 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
# 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
# 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

# Example 2:
# Input: adjList = [[]]
# Output: [[]]
# Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.

# Example 3:
# Input: adjList = []
# Output: []
# Explanation: This an empty graph, it does not have any nodes.


# Definition for a Node.
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


from typing import Optional


class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        visited = {}

        if not node:
            return None

        def recursive(node: Optional["Node"]):
            if not node:
                return node

            if node in visited:
                return visited[node]

            copy = Node(node.val, [])
            visited[node] = copy

            for neighbor in node.neighbors:
                copy.neighbors.append(recursive(neighbor))

            return copy

        return recursive(node)
      
    def dfs_stack(self, node: Optional["Node"]) -> Optional["Node"]:
        stack: Optional["Node"] = [];
        visited = {}
        
        if not node:
            return None
          
        stack.append(node)
        visited[node] = Node(node.val, [])
        
        while len(stack):
            current = stack.pop()
            for item in current.neighbors:
                if item not in visited:
                    visited[item] = Node(item.val, []);
                    stack.append(item)
                visited[current].neighbors.append(visited[item])

        return visited[node]
      
    def bfs(self, node: Optional["Node"]) -> Optional["Node"]:
        queue: Optional["Node"] = [];
        visited = {}
        
        if not node:
            return None
          
        queue.append(node)
        visited[node] = Node(node.val, [])
        
        while len(queue):
            size = len(queue)
            for i in range(0, size):
                current = queue.pop(0)
                for item in current.neighbors:
                  if item not in visited:
                      visited[item] = Node(item.val, []);
                      queue.append(item)
                  visited[current].neighbors.append(visited[item])
                
        return visited[node]