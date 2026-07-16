// 133. Clone Graph

// Given a reference of a node in a connected undirected graph.
// Return a deep copy (clone) of the graph.
// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }

// Test case format:
// For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
// An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

// Example 1:
// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

// Example 2:
// Input: adjList = [[]]
// Output: [[]]
// Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.

// Example 3:
// Input: adjList = []
// Output: []
// Explanation: This an empty graph, it does not have any nodes.

// Definition for Node.
class Node {
  val: number;
  neighbors: Node[];
  constructor(val?: number, neighbors?: Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// DFS
export function cloneGraph_DFS(node: Node | null): Node | null {
  const visited = new Map<Node, Node>();
  return clone(node, visited);
}

function clone(node: Node | null, visited: Map<Node, Node>): Node | null {
  if (!node) {
    return node;
  }

  if (visited.has(node)) {
    return visited.get(node)!;
  }

  const copy = new Node(node.val, []);
  visited.set(node, copy);

  for (const neighbor of node.neighbors) {
    copy.neighbors.push(clone(neighbor, visited)!);
  }

  return copy;
}

export function cloneGraph_DFS_Stack(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  const visited = new Map<Node, Node>();
  const stack: Node[] = [];

  stack.push(node);
  visited.set(node, new Node(node.val));

  while (stack.length) {
    const current = stack.pop()!;
    for (const next of current.neighbors) {
      if (!visited.has(next)) {
        visited.set(next, new Node(next.val));
        stack.push(next);
      }
      visited.get(current)?.neighbors.push(visited.get(next)!);
    }
  }

  return visited.get(node)!;
}

// BFS
export function cloneGraph_BFS(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  const queue: Array<Node> = [];
  const res = new Map<Node, Node>();

  // initial
  queue.push(node);
  res.set(node, new Node(node.val));

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue[0];
      for (const item of current?.neighbors) {
        if (!res.has(item)) {
          res.set(item, new Node(item.val));
          queue.push(item);
        }
        res.get(current)!.neighbors.push(res.get(item)!);
      }
      queue.shift();
    }
  }

  return res.get(node)!;
}
