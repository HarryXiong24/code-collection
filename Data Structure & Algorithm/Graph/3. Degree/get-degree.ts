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

  getInDegree(): Map<number, number> {
    const inDegreeList: Map<number, number> = new Map();

    for (const item of this.adjacencyList) {
      for (const inDegree of item[1]) {
        if (!inDegreeList.has(inDegree)) {
          inDegreeList.set(inDegree, 0);
        }
        inDegreeList.set(inDegree, inDegreeList.get(inDegree)! + 1);
      }
    }

    return inDegreeList;
  }

  getOutDegree(): Map<number, number> {
    const outDegreeList: Map<number, number> = new Map();

    for (const item of this.adjacencyList) {
      const node = item[0];
      const outDegree = item[1].length;
      if (!outDegreeList.has(node)) {
        outDegreeList.set(node, 0);
      }
      outDegreeList.set(node, outDegree);
    }

    return outDegreeList;
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

// test
const inDegree = graph.getInDegree();
console.log('inDegree: ', inDegree);
const outDegree = graph.getOutDegree();
console.log('outDegree: ', outDegree);
