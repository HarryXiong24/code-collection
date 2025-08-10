interface TestNode {
  value: any;
  neighbors: TestNode[];
}

export function DFS_Stack(root: TestNode) {
  const stack: TestNode[] = [root];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current) {
      console.log(current.value);
    }
    for (const next of current.neighbors) {
      stack.push(next);
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

DFS_Stack(root);
