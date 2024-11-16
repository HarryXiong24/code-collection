type Graph = number[][]; // Define the graph as a 2D array of numbers
type Journey = number[]; // Define a journey as an array of numbers

// Solve TSP exactly, using dynamic programming.
// The graph is given as an adjacency matrix. No edges have a cost of '0'.
// The value graph[i][j] tells you the cost of an edge from i to j. This graph is directed.
// However, if graph[i][j] == 0, this means there is no edge from i to j.
function tspDynamicProgram(graph: Graph, n: number): Journey {
  const N = n;
  const FULL_MASK = (1 << N) - 1;
  const INF = Number.MAX_SAFE_INTEGER / 2; // Prevent overflow

  // dp[mask][u]: Minimum cost to travel from the start node 0, visiting nodes in mask, and ending at node u
  const dp: number[][] = Array.from({ length: 1 << N }, () => Array(N).fill(INF));
  const parent: number[][] = Array.from({ length: 1 << N }, () => Array(N).fill(-1));

  dp[1][0] = 0; // Starting at node 0 with visited set as 1 << 0

  // Iterate through all possible states mask
  for (let mask = 1; mask < 1 << N; mask++) {
    if (!(mask & 1)) {
      // If the start node 0 is not included, skip
      continue;
    }

    // Iterate through all possible target nodes u in state mask
    for (let u = 0; u < N; u++) {
      if (!(mask & (1 << u))) {
        // If u is not in mask, skip
        continue;
      }

      // Iterate through all possible predecessor nodes v in state mask
      for (let v = 0; v < N; v++) {
        if (v === u) {
          // Ensure the predecessor node and current node are different
          continue;
        }

        if (!(mask & (1 << v))) {
          // v must be in mask, skip
          continue;
        }

        if (graph[v][u] === 0) {
          // No edge exists from v to u, skip
          continue;
        }

        const prevMask = mask ^ (1 << u); // Remove node u to get the previous state
        if (dp[prevMask][v] + graph[v][u] < dp[mask][u]) {
          dp[mask][u] = dp[prevMask][v] + graph[v][u]; // Recurrence relation
          parent[mask][u] = v; // Record the predecessor node v
        }
      }
    }
  }

  // Find the minimum-cost cycle
  let minCost = INF;
  let last = -1;

  // Iterate through all nodes from 1 to N-1 (excluding the start node 0)
  for (let u = 1; u < N; u++) {
    if (graph[u][0] === 0) {
      // No edge exists from u back to 0, skip
      continue;
    }

    // dp[FULL_MASK][u] + graph[u][0]: Total cost of starting at node 0, visiting all nodes, and returning to 0
    if (dp[FULL_MASK][u] + graph[u][0] < minCost) {
      minCost = dp[FULL_MASK][u] + graph[u][0];
      last = u;
    }
  }

  if (minCost >= INF) {
    // No feasible cycle
    return [];
  }

  // Reconstruct the path
  const journey: Journey = [0]; // Start node 0
  let mask = FULL_MASK;
  let u = last;

  const tempPath: Journey = [];
  while (u !== -1 && u !== 0) {
    tempPath.push(u); // Add current node u to tempPath
    const prevU = parent[mask][u]; // Get the predecessor node
    mask ^= 1 << u; // Clear the bit for u
    u = prevU; // Update the current node to the predecessor
  }

  // Reverse the path and add it to journey
  journey.push(...tempPath.reverse());

  // Add the return to the start node 0
  journey.push(0);

  return journey;
}

// Returns the cost of the journey described here.
function costOfJourney(graph: Graph, journey: Journey): number {
  let cost = 0;
  for (let i = 0; i < journey.length - 1; i++) {
    cost += graph[journey[i]][journey[i + 1]];
  }
  cost += graph[journey[journey.length - 1]][journey[0]];
  return cost;
}
