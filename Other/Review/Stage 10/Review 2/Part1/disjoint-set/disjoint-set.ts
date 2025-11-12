export class DisjointSet {
  private root: number[] = [];

  constructor(size: number) {
    this.root = new Array(size).fill(0).map((_, index) => {
      return index;
    });
  }

  find(x: number): number {
    if (this.root[x] === x) {
      return x;
    }
    return this.find(this.root[x]);
  }

  union(x: number, y: number) {
    const root_x = this.root[x];
    const root_y = this.root[y];

    if (root_x !== root_y) {
      this.root[root_y] = root_x;
    }
  }

  isConnected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

// test
const unionFind = new DisjointSet(10);
unionFind.union(1, 2);
unionFind.union(2, 3);
unionFind.union(4, 5);
unionFind.union(6, 7);
unionFind.union(8, 9);
unionFind.union(1, 9);
console.log(unionFind.isConnected(1, 9));
console.log(unionFind.isConnected(3, 9));
console.log(unionFind.isConnected(1, 4));
console.log(unionFind.isConnected(8, 4));
console.log(unionFind.isConnected(4, 5));
console.log(unionFind.isConnected(5, 6));
console.log(unionFind.isConnected(6, 7));
