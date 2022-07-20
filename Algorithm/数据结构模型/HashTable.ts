// 哈希表（散列表）
// 在 JS 引擎内部已经将 Map 和 Object 优化为了散列表
// 所以下面只是实现类似的优化过程，并没有实际的优化效果

/**
 * 功能
 * 1.把键映射为统一的 String 数据类型
 * 2.哈希函数
 * 3.计算键的哈希值
 * 4.更新散列表
 * 5.根据键获取值
 * 6.根据键移除值
 * 7.返回是否为空散列表
 * 8.散列表的大小
 * 9.清空散列表
 * 10.返回内部的 Hash Table
 */

export class HashTable<K, V> {
  public table: Map<number, V>;

  constructor() {
    this.table = new Map<number, V>();
  }

  // toStrFn 辅助方法，把键映射为统一的 String 数据类型
  toStrFn(item: any): string {
    // 对于 null | undefined和字符串的处理
    if (item === null) {
      return 'NULL';
    } else if (item === undefined) {
      return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`;
    }
    // 其他情况时调用数据结构自带的 toString 方法
    return item.toString();
  }

  // 哈希函数
  djb2HashCode<K>(key: K): number {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  // 计算键的哈希值
  hashCode(key: K): number {
    return this.djb2HashCode(key);
  }

  // 更新散列表
  put(key: K, value: V): boolean {
    if (key !== null && value !== null) {
      const position = this.hashCode(key);
      this.table.set(position, value);
      return true;
    }
    return false;
  }

  // 根据键获取值
  get(key: K): V | undefined {
    return this.table.get(this.hashCode(key));
  }

  // 根据键移除值
  remove(key: K): boolean {
    return this.table.delete(this.hashCode(key));
  }

  // 返回内部table
  getTable(): Map<number, V> {
    return this.table;
  }

  // 返回是否为空散列表
  isEmpty(): boolean {
    return this.table.size === 0;
  }

  // 散列表的大小
  size(): number {
    return this.table.size;
  }

  // 清空散列表
  clear() {
    this.table.clear();
  }
}

// test
let hashTable = new HashTable();
hashTable.put('one', 3);
hashTable.put('two', 2);
hashTable.put('three', 4);
hashTable.put('four', 1);
hashTable.put('five', 0);
console.log(hashTable.getTable());
console.log(hashTable.isEmpty());
console.log(hashTable.get('five'));
console.log(hashTable.remove('one'));
console.log(hashTable.getTable());
console.log(hashTable.size());

// toStrFn 辅助方法
// 由于键有可能是各种数据类型，所以第一步首先要把键映射为统一的 String 数据类型
export function toStrFn(item: any): string {
  // 对于 null | undefined和字符串的处理
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  // 其他情况时调用数据结构自带的 toString 方法
  return item.toString();
}

// loselose 函数
// 将字符串各个位上的 UTF-16 Unicode 值加起来，然后对 37 取余即为哈希值：
export function loseloseHashCode<T>(key: T): number {
  if (typeof key === 'number') {
    return key;
  }
  const tableKey = toStrFn(key);
  let hash = 0;
  for (let i = 0; i < tableKey.length; i++) {
    hash += tableKey.charCodeAt(i);
  }
  return hash % 37;
}

// djb2 函数
// 可以发现，上述的 loselose 哈希算法有一个很重大缺点
// 就是不同的源字符串导致出现相同哈希值的概率很高
// 比如 Jonathan、Jamie、Sue 和 Aethelwulf 会有相同的哈希值 5
// 所以改进一下算法，将 hash 初始值设置 5381，每次迭代时将 hash 乘 33 再累加
// 最后对 1013 取余，使得出现重复哈希值得概率大幅度降低
export function djb2HashCode<T>(key: T): number {
  if (typeof key === 'number') {
    return key;
  }
  const tableKey = toStrFn(key);
  let hash = 5381;
  for (let i = 0; i < tableKey.length; i++) {
    hash = hash * 33 + tableKey.charCodeAt(i);
  }
  return hash % 1013;
}
