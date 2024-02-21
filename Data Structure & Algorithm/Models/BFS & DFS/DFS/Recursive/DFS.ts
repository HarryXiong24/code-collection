interface TestNode {
  value: any;
  neighbors: TestNode[];
}

export function DFS_Recursion(root: TestNode) {
  const recursive = (node: TestNode) => {
    if (!node) {
      return;
    }
    console.log(node.value);
    for (let next of node.neighbors) {
      recursive(next);
    }
  };

  recursive(root);
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

DFS_Recursion(root);
