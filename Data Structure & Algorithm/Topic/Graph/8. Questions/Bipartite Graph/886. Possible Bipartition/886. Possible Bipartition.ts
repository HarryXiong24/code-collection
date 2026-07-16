// 886. Possible Bipartition

// We want to split a group of n people (labeled from 1 to n) into two groups of any size. Each person may dislike some other people, and they should not go into the same group.

// Given the integer n and the array dislikes where dislikes[i] = [ai, bi] indicates that the person labeled ai does not like the person labeled bi, return true if it is possible to split everyone into two groups in this way.

// Example 1:
// Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
// Output: true
// Explanation: The first group has [1,4], and the second group has [2,3].

// Example 2:
// Input: n = 3, dislikes = [[1,2],[1,3],[2,3]]
// Output: false
// Explanation: We need at least 3 groups to divide them. We cannot put them in two groups.

export function possibleBipartition(n: number, dislikes: number[][]): boolean {
  const adjacentList = new Map<number, number[]>();

  for (let i = 1; i <= n; i++) {
    adjacentList.set(i, []);
  }

  for (let i = 0; i < dislikes.length; i++) {
    const [u, v] = dislikes[i];
    adjacentList.get(u)!.push(v);
    adjacentList.get(v)!.push(u);
  }

  const visited = new Map<number, boolean>();

  const recursion = (node: number, color: boolean): boolean => {
    visited.set(node, color);

    const neighbors = adjacentList.get(node)!;
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (!recursion(neighbor, !color)) {
          return false;
        }
      } else {
        const neighbor_color = visited.get(neighbor);
        if (neighbor_color === color) {
          return false;
        }
      }
    }

    return true;
  };

  for (let i = 1; i <= n; i++) {
    if (!visited.has(i)) {
      if (!recursion(i, true)) {
        return false;
      }
    }
  }

  return true;
}

// test
const res = possibleBipartition(4, [
  [1, 2],
  [1, 3],
  [2, 4],
]);
console.log(res);
