class DynamicArray<T> {
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
    this.add(this.data.length, value);
  }

  // remove
  remove(index: number): T {
    if (index < 0 || index >= this.data.length) {
      throw new Error('index overflow!');
    }

    const cap = this.data.length;
    if (this.size === Math.floor(cap / 4)) {
      this.resize(Math.floor(cap / 2));
    }

    const deleteValue = this.data[index];

    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }

    this.data[this.size - 1] = null as T;
    this.size--;

    return deleteValue;
  }

  pop(): T {
    return this.remove(this.data.length - 1);
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
console.log(arr.print());

// 添加 5 个元素
for (let i = 1; i <= 5; i++) {
  arr.push(i);
}
console.log(arr.print());

arr.remove(3);
console.log(arr.print());

arr.add(1, 9);
console.log(arr.print());

arr.unshift(100);
console.log(arr.print());

const val = arr.pop();
console.log(val, arr.print());

// 100 1 9 2 3
