type Graph = Record<string, string[]>;

export function traverseVertices(graph: Graph, start: string): string[] {
  const stack: string[] = [start];
  const isVisited: Set<string> = new Set(start);
  const result: string[] = [];

  while (stack.length) {
    const current = stack.pop()!;

    result.push(current);

    for (const neighbor of graph[current]) {
      if (!isVisited.has(neighbor)) {
        stack.push(neighbor);
        isVisited.add(neighbor);
      }
    }
  }

  return result;
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
const res = traverseVertices(graph, 'A');
console.log(res);
