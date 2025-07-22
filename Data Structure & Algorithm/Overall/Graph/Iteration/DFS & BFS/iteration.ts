export class Graph {
  // Adjacency List
  private adjacencyList: Map<number, number[]>;

  constructor() {
    this.adjacencyList = new Map<number, number[]>();
  }

  // add edges
  addEdgeToAdjacencyList(from: number, to: number): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    this.adjacencyList.get(from)!.push(to);

    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, []);
    }
  }

  printGraphByAdjacencyList(): void {
    for (const [from, neighbors] of this.adjacencyList) {
      console.log(`${from} -> ${neighbors}`);
    }
  }

  dfs(begin: number): number[] {
    const result: number[] = [];
    const visited: Set<number> = new Set();

    const recursion = (node: number) => {
      const neighbors = this.adjacencyList.get(node);
      if (!neighbors || neighbors.length === 0) {
        result.push(node);
        visited.add(node);
        return;
      }

      result.push(node);
      visited.add(node);

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
          continue;
        }
        recursion(neighbor);
      }
    };

    recursion(begin);

    return result;
  }

  bfs(begin: number): number[] {
    const result: number[] = [];
    const queue: number[] = [];
    const visited: Set<number> = new Set();

    // init
    queue.push(begin);
    visited.add(begin);

    while (queue.length) {
      const current = queue.shift()!;

      result.push(current);

      if (this.adjacencyList.has(current)) {
        for (const neighbor of this.adjacencyList.get(current)!) {
          if (visited.has(neighbor)) {
            continue;
          }
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }

    return result;
  }
}

// test
const graph = new Graph();

// add edges for the adjacency list
graph.addEdgeToAdjacencyList(0, 1);
graph.addEdgeToAdjacencyList(0, 2);
graph.addEdgeToAdjacencyList(1, 3);
graph.addEdgeToAdjacencyList(2, 3);
graph.addEdgeToAdjacencyList(2, 4);
graph.addEdgeToAdjacencyList(3, 0);

console.log('Adjacency List:');
graph.printGraphByAdjacencyList();

// dfs test
const dfs = graph.dfs(0);
console.log(dfs);

// bfs test
const bfs = graph.bfs(0);
console.log(bfs);
