type Graph = Record<string, string[]>;

export function traverseVertices(graph: Graph, start: string): string[] {
  const stack: string[] = [start];
  const isVisited: Set<string> = new Set(start);
  const results: string[] = [];

  while (stack.length) {
    const current = stack.pop()!;

    results.push(current);

    for (const neighbor of graph[current]) {
      if (!isVisited.has(neighbor)) {
        stack.push(neighbor);
        isVisited.add(neighbor);
      }
    }
  }

  return results;
}

export function traverseVertices_recursive(graph: Graph, start: string): string[] {
  const isVisited: Set<string> = new Set(start);
  const results: string[] = [];

  const recursive = (node: string) => {
    results.push(node);

    for (const neighbor of graph[node]) {
      if (!isVisited.has(neighbor)) {
        isVisited.add(neighbor);
        recursive(neighbor);
      }
    }
  };

  recursive(start);
  return results;
}

// test
const graph = {
  A: ['B', 'C', 'D'],
  B: ['A', 'E', 'F'],
  D: ['A', 'E'],
  C: ['A', 'E'],
  E: ['B', 'D', 'F'],
  F: ['B', 'E'],
};
const res1 = traverseVertices(graph, 'A');
const res2 = traverseVertices_recursive(graph, 'A');
console.log(res1);
console.log(res2);
