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

// test
const graph = {
  A: ['B', 'C', 'D'],
  B: ['A', 'E', 'F'],
  D: ['A', 'E'],
  C: ['A', 'E'],
  E: ['B', 'D', 'F'],
  F: ['B', 'E'],
};
const res = traverseAllPathsBetweenTwoVertices(graph, 'A', 'B');
console.log(res);
