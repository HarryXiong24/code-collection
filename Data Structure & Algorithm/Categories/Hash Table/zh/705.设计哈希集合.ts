// 705 设计哈希集合

/**
 * 不使用任何内建的哈希表库设计一个哈希集合（HashSet）
 * 实现 MyHashSet 类：
 * void add(key) 向哈希集合中插入值 key 。
 * bool contains(key) 返回哈希集合中是否存在这个值 key 。
 * void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。
 */

export class MyHashSet {
  public items: any;

  constructor() {
    this.items = {};
  }

  add(key: number): void {
    if (!this.contains(key)) {
      this.items[key] = key;
    }
  }

  remove(key: number): void {
    if (this.contains(key)) {
      Reflect.deleteProperty(this.items, key);
    }
  }

  // 返回哈希集合中是否存在这个值 key
  contains(key: number): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, key);
    // 或者
    // return this.items.hasOwnProperty(key);
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
