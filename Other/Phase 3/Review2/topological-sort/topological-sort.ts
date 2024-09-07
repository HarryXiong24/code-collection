enum Color {
  White = 0, // non-access
  Gray = 1,
  Black = 2, // both itself and its adjacent nodes were accessed
}

export class Graph {
  vertices: number;
  adjacentList: Map<number, number[]>;

  constructor(size: number) {
    this.vertices = size;
    this.adjacentList = new Map();
  }

  addEdge(v: number, w: number) {
    if (!this.adjacentList.has(v)) {
      this.adjacentList.set(v, []);
    }
    this.adjacentList.get(v)!.push(w);
  }

  topologicalSort() {
    const stack: number[] = [];
    const visited: Color[] = new Array(this.vertices).fill(Color.White);

    const recursive = (vertex: number): boolean => {
      visited[vertex] = Color.Gray;

      if (this.adjacentList.has(vertex)) {
        for (const neighbor of this.adjacentList.get(vertex)!) {
          if (visited[neighbor] === Color.Gray) {
            return true;
          }
          if (visited[neighbor] === Color.White && recursive(neighbor)) {
            return true;
          }
        }
      }

      visited[vertex] = Color.Black;
      stack.push(vertex);
      return false;
    };

    for (let i = 0; i < this.vertices; i++) {
      if (visited[i] === Color.White) {
        if (recursive(i)) {
          return null;
        }
      }
    }

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
