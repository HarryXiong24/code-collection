// 332. Reconstruct Itinerary

// You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

// All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

// For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

// Example 1:
// Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// Output: ["JFK","MUC","LHR","SFO","SJC"]

// Example 2:
// Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
// Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.

export function findItinerary(tickets: string[][]): string[] {
  const graph: Map<string, string[]> = new Map();
  const result: string[] = [];

  // Create a graph
  for (const [from, to] of tickets) {
    if (!graph.has(from)) {
      graph.set(from, []);
    }
    graph.get(from)!.push(to);
  }

  // Sort the destinations to ensure lexical order
  graph.forEach((destinations) => destinations.sort());

  const dfs = (node: string) => {
    const destinations = graph.get(node);
    while (destinations && destinations.length > 0) {
      const next = destinations.shift()!; // Remove the first destination
      dfs(next);
    }
    result.push(node);
  };

  // Start DFS from 'JFK'
  dfs('JFK');

  return result.reverse();
}

// test
const res = findItinerary([
  ['JFK', 'SFO'],
  ['JFK', 'ATL'],
  ['SFO', 'ATL'],
  ['ATL', 'JFK'],
  ['ATL', 'SFO'],
]);
console.log(res);
