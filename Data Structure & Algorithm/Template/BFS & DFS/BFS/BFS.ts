interface TestNode {
  value: any;
  neighbors: TestNode[];
}

export function BFS(root: TestNode): number {
  // store all nodes which are waiting to be processed
  const queue: TestNode[] = [root];
  // number of steps needed from root to current node
  let layer = 0;
  // BFS
  while (queue.length) {
    // iterate the nodes which are already in the queue
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      if (current) {
        console.log(current.value);
      }
      for (const next of current.neighbors) {
        queue.push(next);
      }
    }
    layer = layer + 1;
  }
  return layer;
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
const res = BFS(root);
console.log('layer', res);
