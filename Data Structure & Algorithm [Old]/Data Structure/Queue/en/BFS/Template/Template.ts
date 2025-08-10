// Previously, we have already introduced two main scenarios of using BFS: do traversal or find the shortest path.
// Typically, it happens in a tree or a graph. As we mentioned in the chapter description, BFS can also be used in more abstract scenarios.

// In this article, we will provide you with a template. Then, we provide some exercise after this article for practice.

// It will be important to determine the nodes and the edges before doing BFS in a specific question.\
// Typically, the node will be an actual node or a status while the edge will be an actual edge or a possible transition.

interface Node {
  value: any;
  neighbors: Node[];
}

export function BFS(root: Node, target: Node): number {
  // store all nodes which are waiting to be processed
  const queue: Node[] = [root];
  // number of steps needed from root to current node
  let step = 0;
  // BFS
  while (queue.length) {
    // iterate the nodes which are already in the queue
    const size = queue.length;
    for (let i = 0; i < size; ++i) {
      const cur = queue[0];
      if (cur === target) {
        return step;
      }
      for (const next of cur.neighbors) {
        queue.push(next);
      }
      queue.shift();
    }
    step = step + 1;
  }
  // there is no path from root to target
  return -1;
}

// Sometimes, it is important to make sure that we never visit a node twice.
// Otherwise, we might get stuck in an infinite loop, e.g. in graph with cycle.
// If so, we can add a hash set to the code above to solve this problem.

export function BFS_Cache(root: Node, target: Node): number {
  // store all nodes which are waiting to be processed
  const queue: Node[] = [root];
  // store all the nodes that we've visited
  const visited = new Set();
  // number of steps needed from root to current node
  let step = 0;
  // initialize
  visited.add(root);
  // BFS
  while (queue.length) {
    // iterate the nodes which are already in the queue
    const size = queue.length;
    for (let i = 0; i < size; ++i) {
      const cur = queue[0];
      if (cur === target) {
        return step;
      }
      for (const next of cur.neighbors) {
        if (!visited.has(next)) {
          queue.push(next);
          visited.add(next);
        }
      }
      queue.shift();
    }
    step = step + 1;
  }
  // there is no path from root to target
  return -1;
}
