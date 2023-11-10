// 1101. The Earliest Moment When Everyone Become Friends

// There are n people in a social group labeled from 0 to n - 1. You are given an array logs where logs[i] = [timestampi, xi, yi] indicates that xi and yi will be friends at the time timestampi.

// Friendship is symmetric. That means if a is friends with b, then b is friends with a. Also, person a is acquainted with a person b if a is friends with b, or a is a friend of someone acquainted with b.

// Return the earliest time for which every person became acquainted with every other person. If there is no such earliest time, return -1.

// Example 1:
// Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], n = 6
// Output: 20190301
// Explanation:
// The first event occurs at timestamp = 20190101, and after 0 and 1 become friends, we have the following friendship groups [0,1], [2], [3], [4], [5].
// The second event occurs at timestamp = 20190104, and after 3 and 4 become friends, we have the following friendship groups [0,1], [2], [3,4], [5].
// The third event occurs at timestamp = 20190107, and after 2 and 3 become friends, we have the following friendship groups [0,1], [2,3,4], [5].
// The fourth event occurs at timestamp = 20190211, and after 1 and 5 become friends, we have the following friendship groups [0,1,5], [2,3,4].
// The fifth event occurs at timestamp = 20190224, and as 2 and 4 are already friends, nothing happens.
// The sixth event occurs at timestamp = 20190301, and after 0 and 3 become friends, we all become friends.

// Example 2:
// Input: logs = [[0,2,0],[1,0,1],[3,0,3],[4,1,2],[7,3,1]], n = 4
// Output: 3
// Explanation: At timestamp = 3, all the persons (i.e., 0, 1, 2, and 3) become friends.

class QuickUnion {
  root: number[];
  rank: number[];
  root_count: number;

  constructor(size: number) {
    this.root = new Array(size).fill(0).map((_, i) => i);
    this.rank = new Array(size).fill(1);
    this.root_count = size;
  }

  find(x: number) {
    if (x === this.root[x]) {
      return x;
    }
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
  }

  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
      this.root_count--;
    }
  }

  isConnected(x: number, y: number) {
    return this.root[x] === this.root[y];
  }

  getRootCount() {
    return this.root_count;
  }
}

export function earliestAcq(logs: number[][], n: number): number {
  const quickUnion = new QuickUnion(n);

  // sorting is important, need to make sure that building friendship must follow the time sequence.
  logs.sort((a, b) => a[0] - b[0]);

  for (let item of logs) {
    const [data, x, y] = [...item];
    quickUnion.union(x, y);
    if (quickUnion.getRootCount() === 1) {
      return data;
    }
  }

  return -1;
}

// test
const res = earliestAcq(
  [
    [20190101, 0, 1],
    [20190104, 3, 4],
    [20190107, 2, 3],
    [20190211, 1, 5],
    [20190224, 2, 4],
    [20190301, 0, 3],
    [20190312, 1, 2],
    [20190322, 4, 5],
  ],
  6
);
console.log(res);
