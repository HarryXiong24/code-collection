export class DynamicArray<T> {
  data: T[];
  size: number;
  static INIT_CAP = 1;

  constructor(initCapacity: number) {
    const capacity = initCapacity || DynamicArray.INIT_CAP;
    this.data = new Array(capacity);
    this.size = 0;
  }

  // Check size
  getSize(): number {
    return this.size;
  }

  // Check capacity
  getCapacity(): number {
    return this.data.length;
  }

  // Check empty
  isEmpty() {
    return this.size === 0;
  }

  // Get element, like getting array[1]
  get(index: number): T {
    if (index < 0 || index >= this.data.length) {
      throw new Error('index overflow!');
    }

    return this.data[index];
  }

  // Set element, like array[1] = 5
  set(index: number, value: T) {
    if (index < 0 || index >= this.data.length) {
      throw new Error('index overflow!');
    }

    this.data[index] = value;
  }

  // Print
  print(): T[] {
    const result: T[] = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      result[i] = this.data[i];
    }

    return result;
  }

  // Add
  add(index: number, value: T) {
    if (index < 0 || index > this.size) {
      throw new Error('index overflow!');
    }

    const cap = this.data.length;
    if (this.size === cap) {
      this.resize(2 * cap);
    }

    // move data after index
    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }

    this.data[index] = value;
    this.size++;
  }

  unshift(value: T) {
    this.add(0, value);
  }

  push(value: T) {
    this.add(this.size, value);
  }

  // remove
  remove(index: number): T {
    if (index < 0 || index >= this.data.length) {
      throw new Error('index overflow!');
    }

    const deleteValue = this.data[index];

    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }

    this.data[this.size - 1] = null as T;
    this.size--;

    const cap = this.data.length;
    if (this.size <= Math.floor(cap / 4)) {
      this.resize(Math.floor(cap / 2));
    }

    return deleteValue;
  }

  pop(): T {
    return this.remove(this.size - 1);
  }

  shift(): T {
    return this.remove(0);
  }

  // utils

  // resize
  resize(newCap: number) {
    const newData = new Array<T>(newCap);

    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }

    this.data = newData;
  }
}

// test
const arr = new DynamicArray(3);
console.log(arr.print()); // []
console.log(arr.getCapacity()); // 3

// add 5 elements
for (let i = 1; i <= 5; i++) {
  arr.push(i);
}
console.log(arr.print()); // [1, 2, 3, 4, 5]
console.log(arr.getCapacity()); // 6

arr.remove(3);
console.log(arr.print()); // [1, 2, 3, 5]
console.log(arr.getCapacity()); // 6

arr.add(1, 9);
console.log(arr.print()); // [1, 9, 2, 3, 5]
console.log(arr.getCapacity()); // 6

arr.unshift(100);
console.log(arr.print()); // [100, 1, 9, 2, 3, 5];
console.log(arr.getCapacity()); // 6

const val = arr.pop();
console.log(val, arr.print()); // 5 [100, 1, 9, 2, 3];
console.log(arr.getCapacity()); // 6

const val2 = arr.shift();
console.log(val2, arr.print()); // 5 [1, 9, 2, 3];
console.log(arr.getCapacity()); // 6

const val3 = arr.shift();
console.log(val3, arr.print()); // 1 [9, 2, 3];
console.log(arr.getCapacity()); // 6

const val4 = arr.shift();
console.log(val4, arr.print()); // 9 [2, 3];
console.log(arr.getCapacity()); // 6

const val5 = arr.shift();
console.log(val5, arr.print()); // 2 [3];
console.log(arr.getCapacity()); // 3

const val6 = arr.shift();
console.log(val6, arr.print()); // 2 [];
console.log(arr.getCapacity()); // 3
