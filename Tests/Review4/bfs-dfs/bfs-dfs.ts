interface TestNode {
  value: any;
  neighbors: TestNode[];
}

export function BFS(root: TestNode): number {
  if (!root) {
    return -1;
  }

  let depth = 0;
  const queue: TestNode[] = [root];

  while (queue.length) {
    const size = queue.length;
    for (let _ = 0; _ < size; _++) {
      const current = queue.shift()!;

      console.log(current.value);

      for (const neighbor of current.neighbors) {
        queue.push(neighbor);
      }
    }
    depth++;
  }

  return depth;
}

export function DFS_Iteration(root: TestNode) {
  if (!root) {
    return;
  }

  const stack: TestNode[] = [root];

  while (stack.length) {
    const current = stack.pop()!;

    console.log(current.value);

    for (const neighbor of current.neighbors) {
      stack.push(neighbor);
    }
  }
}

export function DFS_Recursion(root: TestNode) {
  if (!root) {
    return;
  }

  const recursion = (node: TestNode) => {
    if (!node) {
      return;
    }

    console.log(node.value);

    for (const neighbor of node.neighbors) {
      recursion(neighbor);
    }
  };

  recursion(root);
}

// test
const root: TestNode = {
  value: 1,
  neighbors: [
    {
      value: 2,
      neighbors: [
        {
          value: 4,
          neighbors: [],
        },
        {
          value: 5,
          neighbors: [],
        },
      ],
    },
    {
      value: 3,
      neighbors: [
        {
          value: 6,
          neighbors: [
            {
              value: 7,
              neighbors: [],
            },
          ],
        },
      ],
    },
  ],
};

// BFS
const res = BFS(root);
console.log('layer', res);

// DFS Recursion
console.log('------');
DFS_Recursion(root);

// DFS Iteration
console.log('------');
DFS_Iteration(root);
