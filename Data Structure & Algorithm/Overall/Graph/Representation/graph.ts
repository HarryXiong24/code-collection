export class Graph {
  // Adjacency List
  private adjacencyList: Map<number, number[]>;
  // Adjacency Matrix
  private adjacencyMatrix: number[][];

  constructor(vertexCount: number) {
    this.adjacencyList = new Map<number, number[]>();
    this.adjacencyMatrix = Array.from({ length: vertexCount }, () => Array(vertexCount).fill(0));
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

  // add edges
  addEdgeToAdjacencyMatrix(from: number, to: number): void {
    this.adjacencyMatrix[from][to] = 1;
  }

  printGraphByAdjacencyList(): void {
    for (const [from, neighbors] of this.adjacencyList) {
      console.log(`${from} -> ${neighbors}`);
    }
  }

  printGraphByAdjacencyMatrix(): void {
    console.log(this.adjacencyMatrix);
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      const neighbors: number[] = [];
      for (let j = 0; j < this.adjacencyMatrix[i].length; j++) {
        if (this.adjacencyMatrix[i][j] === 1) {
          neighbors.push(j);
        }
      }
      console.log(`${i} -> ${neighbors}`);
    }
  }
}

// test
const graph = new Graph(5);

// add edges for the adjacency list
graph.addEdgeToAdjacencyList(0, 1);
graph.addEdgeToAdjacencyList(0, 2);
graph.addEdgeToAdjacencyList(1, 3);
graph.addEdgeToAdjacencyList(3, 4);

// add edges for the adjacency matrix
graph.addEdgeToAdjacencyMatrix(0, 1);
graph.addEdgeToAdjacencyMatrix(0, 2);
graph.addEdgeToAdjacencyMatrix(1, 3);
graph.addEdgeToAdjacencyMatrix(3, 4);

console.log('Adjacency List:');
graph.printGraphByAdjacencyList();

console.log('Adjacency Matrix:');
graph.printGraphByAdjacencyMatrix();
