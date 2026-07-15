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
    for (let i = 0; i < this.vertices; i++) {
      this.adjacentList.set(i, []);
    }
  }

  addEdge(v: number, w: number) {
    if (!this.adjacentList.has(v)) {
      this.adjacentList.set(v, [] as number[]);
    }
    this.adjacentList.get(v)!.push(w);
  }

  topologicalSort_dfs(): number[] | null {
    const stack: number[] = [];
    const visited: Color[] = new Array(this.vertices).fill(Color.White);
    const inDegree: Map<number, number> = new Map();

    // init
    for (let i = 0; i < this.vertices; i++) {
      // this step is to avoid null key-value for some edges
      if (!this.adjacentList.has(i)) {
        this.adjacentList.set(i, []);
      }
      inDegree.set(i, 0);
    }

    for (const [_, toList] of this.adjacentList) {
      for (const to of toList) {
        inDegree.set(to, inDegree.get(to)! + 1);
      }
    }

    const recursion = (vertex: number): boolean => {
      visited[vertex] = Color.Gray;

      for (const neighbor of this.adjacentList.get(vertex)!) {
        if (visited[neighbor] === Color.Gray) {
          return true;
        }
        if (visited[neighbor] === Color.White && recursion(neighbor)) {
          return true;
        }
      }

      visited[vertex] = Color.Black;
      stack.push(vertex);
      return false;
    };

    for (let i = 0; i < this.vertices; i++) {
      // inDegree.get(i) === 0 can avoid unnecessary recursion since topological sort only begins starts from vertices with in-degree 0.
      if (inDegree.get(i) === 0 && visited[i] === Color.White) {
        if (recursion(i)) {
          return null;
        }
      }
    }

    return stack.length === this.vertices ? stack.reverse() : null;
  }

  topologicalSort_bfs(): number[] | null {
    const result: number[] = [];
    const inDegree: Map<number, number> = new Map();
    const queue: number[] = [];

    // init
    for (let i = 0; i < this.vertices; i++) {
      // this step is to avoid null key-value for some edges
      if (!this.adjacentList.has(i)) {
        this.adjacentList.set(i, []);
      }
      inDegree.set(i, 0);
    }

    for (const [_, toList] of this.adjacentList) {
      for (const to of toList) {
        inDegree.set(to, inDegree.get(to)! + 1);
      }
    }

    for (const [to, degree] of inDegree.entries()) {
      if (degree === 0) {
        queue.push(to);
      }
    }

    while (queue.length) {
      const current = queue.shift()!;

      result.push(current);

      for (const neighbor of this.adjacentList.get(current)!) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    return result.length === this.vertices ? result : null;
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

const result1 = graph1.topologicalSort_dfs();
console.log(result1); // [5, 4, 2, 3, 1, 0]
const result11 = graph1.topologicalSort_bfs();
console.log(result11); // [5, 4, 2, 3, 1, 0]

const graph2 = new Graph(6);
graph2.addEdge(5, 2);
graph2.addEdge(5, 0);
graph2.addEdge(4, 0);
graph2.addEdge(4, 1);
graph2.addEdge(2, 3);
graph2.addEdge(3, 1);
graph2.addEdge(1, 2);

const result2 = graph2.topologicalSort_dfs();
console.log(result2); // null
const result22 = graph2.topologicalSort_bfs();
console.log(result22); // null
