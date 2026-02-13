// 146. LRU Cache
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:
// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists.
// Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
// The functions get and put must each run in O(1) average time complexity.

// Example 1:
// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4
class DNode {
  key: number;
  value: number;
  prev: DNode | null = null;
  next: DNode | null = null;

  constructor(key: number = 0, value: number = 0) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  private capacity: number;
  private cache: Map<number, DNode>;

  private dummyHead: DNode;
  private dummyTail: DNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();

    this.dummyHead = new DNode();
    this.dummyTail = new DNode();
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      this.moveToHead(node);
      return node.value;
    }

    return -1;
  }

  put(key: number, value: number): void {
    if (!this.cache.has(key)) {
      const newNode = new DNode(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);

      if (this.cache.size > this.capacity) {
        const removed = this.removeTail();
        this.cache.delete(removed.key);
      }
    } else {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToHead(node);
    }
  }

  // --- 内部私有工具方法，核心就在这里 ---

  private addToHead(node: DNode): void {
    const next = this.dummyHead.next!;

    this.dummyHead.next = node;
    node.prev = this.dummyHead;
    node.next = next;
    next.prev = node;
  }

  private removeTail(): DNode {
    const tail = this.dummyTail.prev!;

    return this.removeNode(tail);
  }

  private removeNode(node: DNode): DNode {
    const prev = node.prev!;
    const next = node.next!;

    prev.next = next;
    next.prev = prev;

    return node;
  }

  private moveToHead(node: DNode): void {
    // remove from linked list
    const removed = this.removeNode(node);
    // add to head
    this.addToHead(removed);
  }

  getCache(): string {
    const res: string[] = [];
    let curr = this.dummyHead.next;

    while (curr && curr !== this.dummyTail) {
      res.push(`[${curr.key}:${curr.value}]`);
      curr = curr.next;
    }

    if (res.length === 0) {
      return 'Empty';
    }

    return `MRU ${res.join(' <-> ')} LRU`;
  }
}

// test
const lRUCache = new LRUCache(2);

const testLRU = (action: string, result: any) => {
  const actionStr = action.padEnd(15, ' ');
  const resStr = `Result: ${String(result).padEnd(5, ' ')}`;
  console.log(`${actionStr} | ${resStr} | Cache: ${lRUCache.getCache()}`);
};

testLRU('put(1, 1)', lRUCache.put(1, 1)); // cache is {1=1}
testLRU('put(2, 2)', lRUCache.put(2, 2)); // cache is {1=1, 2=2}
testLRU('get(1)', lRUCache.get(1)); // return 1
testLRU('put(3, 3)', lRUCache.put(3, 3)); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
testLRU('get(2)', lRUCache.get(2)); // returns -1 (not found)
testLRU('put(4, 4)', lRUCache.put(4, 4)); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
testLRU('get(1)', lRUCache.get(1)); // return -1 (not found)
testLRU('get(3)', lRUCache.get(3)); // return 3
testLRU('get(4)', lRUCache.get(4)); // return 4
