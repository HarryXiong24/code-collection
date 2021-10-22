// 集合

/**
 * 功能
 * 1.向字典中添加键值对
 * 2.从字典中删除键值对
 * 3.返回某个键是否存在
 * 4.返回字典中键对应的值
 * 5.清空字典
 * 6.返回字典中键值对的数量
 * 7.返回字典是否为空
 * 8.返回字典的键数组
 * 9.返回字典的值数组
 * 10.返回字典的 [键, 值] 数组
 */

export class AdvancedMap<K, V> {
  public items: Map<K, V>;

  constructor(arr: Iterable<readonly [K, V]> = []) {
    this.items = new Map<K, V>(arr);
  }

  // 向字典中添加键值对
  set(key: K, value: V): boolean {
    this.items.set(key, value);
    return true;
  }

  // 返回字典中键对应的值
  get(key: K): V | undefined {
    return this.items.get(key);
  }

  // 返回某个键是否存在
  has(key: K): boolean {
    return this.items.has(key);
  }

  // 从字典中删除键值对
  delete(key: K): boolean {
    return this.items.delete(key);
  }

  // 清空字典
  clear(): void {
    this.items.clear();
  }

  // 返回字典中键值对的数量
  size(): number {
    return this.items.size;
  }

  // 返回字典是否为空
  isEmpty(): boolean {
    return this.items.size === 0;
  }

  // 返回字典的键数组
  keys(): K[] {
    const arr: K[] = [];
    for (let key of this.items.keys()) {
      arr.push(key);
    }
    return arr;
  }

  // 返回字典的值数组
  values(): V[] {
    const arr: V[] = [];
    for (let value of this.items.values()) {
      arr.push(value);
    }
    return arr;
  }

  // 返回字典的 [键, 值] 数组
  entries(): [K, V][] {
    return Array.from(this.items.entries());
  }

  // 迭代字典中所有的键值对
  // callback 有两个参数：key 和 value
  // 该方法可以在回调函数返回 false 时被中止
  // forEach(callback: (key: K, value: V) => any) {
  //   const valuePairs = this.entries();
  //   for (let i = 0; i < valuePairs.length; i++) {
  //     // callback 返回 false 时要终止迭代
  //     if (callback(valuePairs[i][0], valuePairs[i][1]) === false) {
  //       break;
  //     }
  //   }
  // }
}

// test
const map = new AdvancedMap<number, number>([
  [0, 4],
  [1, 10],
]);
console.log(map.entries());
