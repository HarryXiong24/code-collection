export class Graph {
  // Adjacency List
  private adjacencyList: Map<number, number[]>;
  // Vertices
  private size: number;

  constructor(vertices: number) {
    this.adjacencyList = new Map<number, number[]>();
    this.size = vertices;
  }

  addEdgeToAdjacencyList(from: number, to: number) {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    this.adjacencyList.get(from)!.push(to);

    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, []);
    }

    // If you want undirected edges, you should add a reverse link too
    // this.adjacencyList.get(to)!.push(from);
  }

  bfs(begin: number) {
    if (!this.adjacencyList.has(begin)) {
      return;
    }

    const queue: number[] = [begin];
    const isVisited: Set<number> = new Set();

    while (queue.length) {
      const current = queue.shift()!;

      if (isVisited.has(current)) {
        continue;
      }
      isVisited.add(current);
      console.log(current);

      for (const neighbor of this.adjacencyList.get(current)! || []) {
        queue.push(neighbor);
      }
    }
  }

  dfs(begin: number) {
    const isVisited: Set<number> = new Set();

    const recursion = (node: number) => {
      if (!this.adjacencyList.has(node)) {
        return;
      }

      if (isVisited.has(node)) {
        return;
      }
      isVisited.add(node);
      console.log(node);

      for (const neighbor of this.adjacencyList.get(node)! || []) {
        recursion(neighbor);
      }
    };

    recursion(begin);
  }

  dfs_iteration(begin: number) {
    if (!this.adjacencyList.has(begin)) {
      return;
    }

    const stack: number[] = [begin];
    const isVisited: Set<number> = new Set();

    while (stack.length) {
      const current = stack.pop()!;

      if (isVisited.has(current)) {
        continue;
      }
      isVisited.add(current);
      console.log(current);

      for (const neighbor of this.adjacencyList.get(current)! || []) {
        stack.push(neighbor);
      }
    }
  }

  printGraphByAdjacencyList() {
    console.log(this.adjacencyList);
  }
}

// test
const graph = new Graph(5);

// add edges for the adjacency list
graph.addEdgeToAdjacencyList(0, 1);
graph.addEdgeToAdjacencyList(0, 2);
graph.addEdgeToAdjacencyList(0, 5);
graph.addEdgeToAdjacencyList(1, 3);
graph.addEdgeToAdjacencyList(2, 3);
graph.addEdgeToAdjacencyList(3, 4);
graph.addEdgeToAdjacencyList(5, 4);
graph.addEdgeToAdjacencyList(4, 0);

console.log('Adjacency List:');
graph.printGraphByAdjacencyList();

// test bfs & dfs
console.log('BFS: ');
graph.bfs(0);
console.log('DFS: ');
graph.dfs(0);
console.log('DFS Iteration: ');
graph.dfs_iteration(0);
