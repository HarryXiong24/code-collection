// As we mentioned in the chapter's description, in most cases, we can also use DFS when using BFS. But there is an important difference: the traversal order.

// Different from BFS, the nodes you visit earlier might not be the nodes which are closer to the root node. As a result, the first path you found in DFS might not be the shortest path.

interface Node {
  value: any;
  neighbors: Node[];
}

// Return true if there is a path from cur to target.
export function DFS_Recursion(cur: Node, target: Node, visited: Set<Node>): boolean {
  if (cur === target) {
    return true;
  }
  for (const next of cur.neighbors) {
    if (!visited.has(next)) {
      visited.add(next);
      if (DFS_Recursion(next, target, visited)) {
        return true;
      }
    }
  }
  return false;
}

export function DFS_Stack(root: Node, target: Node): boolean {
  const visited: Set<Node> = new Set();
  const stack: Node[] = [root];
  while (stack.length > 0) {
    const cur: Node = stack.pop()!;
    if (cur === target) {
      return true;
    }
    visited.add(cur);
    for (const next of cur.neighbors) {
      if (!visited.has(next)) {
        visited.add(next);
        stack.push(next);
      }
    }
  }
  return false;
}
