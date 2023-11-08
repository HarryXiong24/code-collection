export class UnionFind {
  array: number[];

  // O(n)
  constructor(n: number) {
    this.array = new Array(n).fill(0).map((_, i) => i);
  }

  // O(1)
  find(i: number) {
    return this.array[i];
  }

  // O(n)
  union(i: number, j: number) {
    const rootX = this.find(i);
    const rootY = this.find(j);

    if (rootX === rootY) {
      return;
    }

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] === rootY) {
        this.array[i] = rootX;
      }
    }
  }

  // O(1)
  connected(i: number, j: number) {
    return this.find(i) === this.find(j);
  }
}

// test
const unionFind = new UnionFind(10);
unionFind.union(1, 2);
unionFind.union(2, 3);
unionFind.union(4, 5);
unionFind.union(6, 7);
unionFind.union(8, 9);
unionFind.union(1, 9);
console.log(unionFind.connected(1, 9));
console.log(unionFind.connected(3, 9));
console.log(unionFind.connected(1, 4));
console.log(unionFind.connected(8, 4));
console.log(unionFind.connected(4, 5));
console.log(unionFind.connected(5, 6));
console.log(unionFind.connected(6, 7));
