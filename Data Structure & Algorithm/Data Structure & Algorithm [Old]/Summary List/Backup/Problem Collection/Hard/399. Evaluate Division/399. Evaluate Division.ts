// 399. Evaluate Division

// You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

// You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

// Return the answers to all queries. If a single answer cannot be determined, return -1.0.

// Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

// Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.

// Example 1:
// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation:
// Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
// note: x is undefined => -1.0

// Example 2:
// Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// Output: [3.75000,0.40000,5.00000,0.20000]

// Example 3:
// Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// Output: [0.50000,2.00000,-1.00000,-1.00000]

export function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const gidWeight: Map<string, [string, number]> = new Map();

  const find = (nodeId: string): [string, number] => {
    if (!gidWeight.has(nodeId)) {
      gidWeight.set(nodeId, [nodeId, 1.0]);
    }
    let [groupId, nodeWeight] = gidWeight.get(nodeId)!;

    if (groupId !== nodeId) {
      const [newGroupId, groupWeight] = find(groupId);
      gidWeight.set(nodeId, [newGroupId, nodeWeight * groupWeight]);
    }
    return gidWeight.get(nodeId)!;
  };

  const union = (dividend: string, divisor: string, value: number) => {
    const [dividendGid, dividendWeight] = find(dividend);
    const [divisorGid, divisorWeight] = find(divisor);
    if (dividendGid !== divisorGid) {
      gidWeight.set(dividendGid, [divisorGid, (divisorWeight * value) / dividendWeight]);
    }
  };

  // Step 1). build the union groups
  equations.forEach(([dividend, divisor], index) => {
    union(dividend, divisor, values[index]);
  });

  const results: number[] = [];

  // Step 2). run the evaluation, with "lazy" updates in find() function
  queries.forEach(([dividend, divisor]) => {
    if (!gidWeight.has(dividend) || !gidWeight.has(divisor)) {
      results.push(-1.0);
    } else {
      const [dividendGid, dividendWeight] = find(dividend);
      const [divisorGid, divisorWeight] = find(divisor);

      if (dividendGid !== divisorGid) {
        results.push(-1.0);
      } else {
        results.push(dividendWeight / divisorWeight);
      }
    }
  });

  return results;
}

// test
const res = calcEquation(
  [
    ['a', 'b'],
    ['b', 'c'],
    ['bc', 'cd'],
  ],
  [1.5, 2.5, 5.0],
  [
    ['a', 'c'],
    ['c', 'b'],
    ['bc', 'cd'],
    ['cd', 'bc'],
  ]
);
console.log(res);
