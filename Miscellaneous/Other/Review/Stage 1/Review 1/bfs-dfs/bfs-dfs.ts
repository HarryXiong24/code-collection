interface TestNode {
  value: any;
  neighbors: TestNode[];
}

export function BFS(root: TestNode): number {
  if (!root) {
    return 0;
  }

  const queue: TestNode[] = [root];
  let layer = 0;

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      console.log(current.value);
      for (const item of current.neighbors) {
        queue.push(item);
      }
    }
    layer++;
  }

  return layer;
}

export function DFS_Recursion(root: TestNode) {
  const recursive = (node: TestNode) => {
    if (!node) {
      return;
    }

    console.log(node.value);

    for (const item of node.neighbors) {
      recursive(item);
    }
  };

  recursive(root);
}

export function DFS_Iteration(root: TestNode) {
  if (!root) {
    return;
  }

  const stack: TestNode[] = [root];

  while (stack.length) {
    const current = stack.pop()!;

    console.log(current.value);

    for (const item of current.neighbors) {
      stack.push(item);
    }
  }
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
