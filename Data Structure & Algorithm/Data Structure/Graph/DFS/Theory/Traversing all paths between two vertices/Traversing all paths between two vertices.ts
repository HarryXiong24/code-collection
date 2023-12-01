type Graph = Record<string, string[]>;

export function traverseAllPathsBetweenTwoVertices(graph: Graph, start: string, end: string): string[][] {
  const stack: [string, string[]][] = [[start, [start]]];
  const results: string[][] = [];

  while (stack.length) {
    const [current_vertex, path] = stack.pop()!;

    if (current_vertex === end) {
      results.push(path);
      continue;
    }

    for (const neighbor of graph[current_vertex]) {
      if (!path.includes(neighbor)) {
        stack.push([neighbor, [...path, neighbor]]);
      }
    }
  }

  return results;
}

export function traverseAllPathsBetweenTwoVertices_recursive(graph: Graph, start: string, end: string): string[][] {
  const results: string[][] = [];

  const recursive = (node: string, path: string[]) => {
    if (node === end) {
      results.push(path);
      return;
    }

    for (const neighbor of graph[node]) {
      if (!path.includes(neighbor)) {
        recursive(neighbor, [...path, neighbor]);
      }
    }
  };

  recursive(start, [start]);
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
const res1 = traverseAllPathsBetweenTwoVertices(graph, 'A', 'B');
const res2 = traverseAllPathsBetweenTwoVertices_recursive(graph, 'A', 'B');
console.log(res1);
console.log(res2);
