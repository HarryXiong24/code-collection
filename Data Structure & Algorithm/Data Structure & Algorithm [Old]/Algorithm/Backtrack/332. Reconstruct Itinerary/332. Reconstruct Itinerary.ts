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

// TicketsMap：
// { NRT: Map(1) { 'JFK' => 1 }, JFK: Map(2) { 'KUL' => 1, 'NRT' => 1 } }
type TicketsMap = {
  [index: string]: Map<string, number>;
};

export function findItinerary(tickets: string[][]): string[] {
  const ticketMap: TicketsMap = {};
  const path = ['JFK'];

  tickets.sort((a, b) => {
    return a[1] < b[1] ? -1 : 1;
  });

  for (const [from, to] of tickets) {
    if (ticketMap[from] === undefined) {
      ticketMap[from] = new Map();
    }
    ticketMap[from].set(to, (ticketMap[from].get(to) || 0) + 1);
  }

  const backTracking = (): boolean => {
    if (path.length === tickets.length + 1) {
      return true;
    }

    const targetMap = ticketMap[path[path.length - 1]];

    if (targetMap !== undefined) {
      for (const [to, count] of targetMap.entries()) {
        if (count > 0) {
          path.push(to);
          targetMap.set(to, count - 1);
          if (backTracking() === true) {
            return true;
          }
          targetMap.set(to, count);
          path.pop();
        }
      }
    }
    return false;
  };

  backTracking();

  return path;
}

// test
const res = findItinerary([
  ['MUC', 'LHR'],
  ['JFK', 'MUC'],
  ['SFO', 'SJC'],
  ['LHR', 'SFO'],
]);
console.log(res);
