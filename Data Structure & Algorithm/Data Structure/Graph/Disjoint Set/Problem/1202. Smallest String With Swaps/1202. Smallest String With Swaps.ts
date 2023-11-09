// 1202. Smallest String With Swaps

// You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

// You can swap the characters at any pair of indices in the given pairs any number of times.

// Return the lexicographically smallest string that s can be changed to after using the swaps.

// Example 1:
// Input: s = "dcab", pairs = [[0,3],[1,2]]
// Output: "bacd"
// Explaination:
// Swap s[0] and s[3], s = "bcad"
// Swap s[1] and s[2], s = "bacd"

// Example 2:
// Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
// Output: "abcd"
// Explaination:
// Swap s[0] and s[3], s = "bcad"
// Swap s[0] and s[2], s = "acbd"
// Swap s[1] and s[2], s = "abcd"

// Example 3:
// Input: s = "cba", pairs = [[0,1],[1,2]]
// Output: "abc"
// Explaination:
// Swap s[0] and s[1], s = "bca"
// Swap s[1] and s[2], s = "bac"
// Swap s[0] and s[1], s = "abc"

class QuickUnion {
  root: number[];
  rank: number[];

  constructor(size: number) {
    this.root = new Array(size).fill(0).map((_, i) => i);
    this.rank = new Array(size).fill(1);
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
    }
  }

  isConnected(x: number, y: number) {
    return this.root[x] === this.root[y];
  }
}

export function smallestStringWithSwaps(s: string, pairs: number[][]): string {
  const quickUnion = new QuickUnion(s.length);

  for (const item of pairs) {
    const [x, y] = item;
    quickUnion.union(x, y);
  }

  const map = new Map<number, number[]>();

  for (let i = 0; i < s.length; i++) {
    const cur = quickUnion.find(i);
    if (!map.has(cur)) {
      map.set(cur, []);
    }
    map.get(cur)!.push(i);
  }

  const res: string[] = [];
  for (const item of map.values()) {
    const temp: string[] = [];
    for (const index of item) {
      temp.push(s[index]);
    }
    temp.sort();
    for (let i = 0; i < temp.length; i++) {
      res[item[i]] = temp[i];
    }
  }

  return res.join('');
}

// test
const res = smallestStringWithSwaps('cba', [
  [0, 1],
  [1, 2],
]);
console.log(res);
