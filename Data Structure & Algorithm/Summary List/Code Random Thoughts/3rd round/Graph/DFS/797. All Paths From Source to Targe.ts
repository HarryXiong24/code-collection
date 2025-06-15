// 797. All Paths From Source to Targe

// Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

// The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

// Example 1:
// Input: graph = [[1,2],[3],[3],[]]
// Output: [[0,1,3],[0,2,3]]
// Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

// Example 2:
// Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
// Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

function allPathsSourceTarget(graph: number[][]): number[][] {
  const path: number[] = [];
  const result: number[][] = [];

  const dfs = (node: number, end: number) => {
    if (node === end) {
      result.push([...path]);
      return;
    }

    for (const neighbor of graph[node]) {
      path.push(neighbor);
      dfs(neighbor, end);
      path.pop()!;
    }
  };

  path.push(0);
  dfs(0, graph.length - 1);

  return result;
}

// test
const res = allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]);
console.log(res);
