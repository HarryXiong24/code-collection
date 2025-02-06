export class MySet<T> {
  private map: Map<T, boolean>;

  constructor(arr: T[]) {
    this.map = new Map();

    for (const item of arr) {
      this.map.set(item, true);
    }
  }

  add(value: T) {
    this.map.set(value, true);
  }

  remove(value: T) {
    this.map.delete(value);
  }

  has(value: T): boolean {
    return this.map.has(value);
  }

  size(): number {
    return this.map.size;
  }

  print(): T[] {
    return [...this.map.keys()];
  }
}

// test
const mySet = new MySet([1, 1, 2, 2, 3, 3]);
console.log(mySet.print()); // [1, 2, 3]

mySet.add(1);
console.log(mySet.print()); // [1, 2, 3]

mySet.add(0);
console.log(mySet.print()); // [1, 2, 3, 0]

mySet.remove(1);
console.log(mySet.print()); // [2, 3, 0]

const res = mySet.has(0);
console.log(res); // true
