// Topological Sort

enum Color {
  White = 0, // non-access
  Gray = 1,
  Black = 2, // both itself and its adjacent nodes were accessed
}

// By default, vertex index starts with 0, and the maximum index is vertices-1
export class Graph {
  vertices: number;
  // use adjacent table to represent graph
  adjList: Map<number, number[]>;

  constructor(vertices: number) {
    this.vertices = vertices;
    this.adjList = new Map();
  }

  // add edge
  addEdge(v: number, w: number): void {
    if (!this.adjList.get(v)) {
      this.adjList.set(v, []);
    }
    this.adjList.get(v)!.push(w);
  }

  // topological sort
  topologicalSort(): number[] | null {
    const stack: number[] = [];
    const visited: Color[] = new Array(this.vertices).fill(Color.White);

    // true represent cycle detected
    const recursive = (vertex: number): boolean => {
      visited[vertex] = Color.Gray;

      const neighbors = this.adjList.get(vertex);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (visited[neighbor] === Color.Gray) {
            return true; // cycle detected
          }
          if (visited[neighbor] === Color.White && recursive(neighbor)) {
            return true; // cycle detected in recursion
          }
        }
      }

      visited[vertex] = Color.Black; // Black
      stack.push(vertex);
      return false; // no cycle
    };

    for (let i = 0; i < this.vertices; i++) {
      if (visited[i] === Color.White) {
        if (recursive(i)) {
          return null;
        }
      }
    }

    // reverse to get the right sequence
    return stack.reverse();
  }
}

// test
const graph1 = new Graph(6);
graph1.addEdge(5, 2);
graph1.addEdge(5, 0);
graph1.addEdge(4, 0);
graph1.addEdge(4, 1);
graph1.addEdge(2, 3);
graph1.addEdge(3, 1);

const result1 = graph1.topologicalSort();
console.log(result1); // [5, 4, 2, 3, 1, 0]

const graph2 = new Graph(6);
graph2.addEdge(5, 2);
graph2.addEdge(5, 0);
graph2.addEdge(4, 0);
graph2.addEdge(4, 1);
graph2.addEdge(2, 3);
graph2.addEdge(3, 1);
graph2.addEdge(1, 2);

const result = graph2.topologicalSort();
console.log(result); // null
