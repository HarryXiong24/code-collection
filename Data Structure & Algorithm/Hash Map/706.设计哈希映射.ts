// 706 设计哈希映射

/**
 * 不使用任何内建的哈希表库设计一个哈希映射（HashMap）。
 * 实现 MyHashMap 类：
 * MyHashMap() 用空映射初始化对象
 * void put(int key, int value) 向 HashMap 插入一个键值对 (key, value) 。
 * 如果 key 已经存在于映射中，则更新其对应的值 value 。
 * int get(int key) 返回特定的 key 所映射的 value ；如果映射中不包含 key 的映射，返回 -1 。
 * void remove(key) 如果映射中存在 key 的映射，则移除 key 和它所对应的 value 。
 */

export class MyHashMap {
  public item: Map<number, number>;

  constructor() {
    this.item = new Map<number, number>();
  }

  put(key: number, value: number): void {
    this.item.set(key, value);
  }

  get(key: number): number {
    if (this.isExist(key)) {
      return this.item.get(key)!;
    } else {
      return -1;
    }
  }

  remove(key: number): void {
    if (this.isExist(key)) {
      this.item.delete(key);
    }
  }

  isExist(key: number): boolean {
    return this.item.has(key);
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
