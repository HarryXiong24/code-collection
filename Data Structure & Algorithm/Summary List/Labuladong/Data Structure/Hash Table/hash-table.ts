// 拉链法使用的单链表节点，存储 key-value 对
class KVNode<K, V> {
  key: K;
  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class ChainingHashMap<K, V> {
  // 底层数组的初始容量
  static INIT_CAP = 4;
  // 哈希表的底层数组，每个数组元素是一个链表（在这里用数组模拟链表）
  table: KVNode<K, V>[][];
  // 哈希表中存入的键值对个数
  size: number;

  constructor(initCapacity = ChainingHashMap.INIT_CAP) {
    this.size = 0;
    // 保证底层数组的容量至少为 1，因为 hash 函数中有求余运算，避免出现除以 0 的情况
    initCapacity = Math.max(initCapacity, 1);
    // 初始化哈希表
    this.table = Array.from({ length: initCapacity }, () => []);
  }

  // 增/改
  // 添加 key -> val 键值对
  // 如果键 key 已存在，则将值修改为 val
  put(key: K, val: V) {
    if (key === null) {
      throw new Error('key is null');
    }

    const list = this.table[this.hash(key)];
    // 如果 key 之前存在，则修改对应的 val
    for (const node of list) {
      if (node.key === key) {
        node.value = val;
        return;
      }
    }
    // 如果 key 之前不存在，则插入，size 增加
    list.push(new KVNode<K, V>(key, val));
    this.size++;

    // 如果元素数量超过了负载因子，进行扩容
    if (this.size >= this.table.length * 0.75) {
      this.resize(this.table.length * 2);
    }
  }

  // 删除 key 和对应的 val
  remove(key: K) {
    if (key === null) {
      throw new Error('key is null');
    }
    const list = this.table[this.hash(key)];
    // 如果 key 存在，则删除，size 减少
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        list.splice(i, 1);
        this.size--;

        // 缩容，当负载因子小于 0.125 时，缩容
        if (this.size <= this.table.length / 8) {
          this.resize(Math.floor(this.table.length / 4));
        }

        return;
      }
    }
  }

  // **** 查 ****

  // 返回 key 对应的 val，如果 key 不存在，则返回 null
  get(key: K) {
    if (key === null) {
      throw new Error('key is null');
    }
    const list = this.table[this.hash(key)];
    for (const node of list) {
      if (node.key === key) {
        return node.value;
      }
    }
    return null;
  }

  // 返回所有 key
  keys(): K[] {
    const keys: K[] = [];
    for (let list of this.table) {
      for (let node of list) {
        keys.push(node.key);
      }
    }
    return keys;
  }

  // 返回所有的 value
  values(): V[] {
    const values: V[] = [];

    for (let list of this.table) {
      for (let node of list) {
        values.push(node.value);
      }
    }

    return values;
  }

  // get size
  getSize() {
    return this.size;
  }

  // utils

  // 哈希函数，将键映射到 table 的索引
  private hash(key: K) {
    // 默认的哈希函数，适用于没有 hashCode 方法的对象
    const defaultHash = () => {
      let hash = 0;
      const keyStr = (key as unknown as any).toString();
      for (let i = 0; i < keyStr.length; i++) {
        hash = (Math.imul(31, hash) + keyStr.charCodeAt(i)) | 0;
      }
      return hash;
    };

    return (
      Math.abs((key as unknown as any).hashCode ? (key as unknown as any).hashCode() : defaultHash()) %
      this.table.length
    );
  }

  private resize(newCap: number) {
    // 构造一个新的 HashMap
    // 避免 newCap 为 0，造成求模运算产生除以 0 的异常
    newCap = Math.max(newCap, 1);
    const newMap = new ChainingHashMap<K, V>(newCap);
    // 穷举当前 HashMap 中的所有键值对
    for (const item of this.table) {
      for (const node of item) {
        // 将键值对转移到新的 HashMap 中
        newMap.put(node.key, node.value);
      }
    }
    // 将当前 HashMap 的底层 table 换掉
    this.table = newMap.table;
  }
}

// test
const map = new ChainingHashMap();
map.put(1, 1);
map.put(2, 2);
map.put(3, 3);
console.log(map.get(1)); // 1
console.log(map.get(2)); // 2

map.put(1, 100);
console.log(map.get(1)); // 100

map.remove(2);
console.log(map.get(2)); // null
console.log(map.keys()); // [1, 3] (order may vary)
console.log(map.values()); // [100, 3] (order may vary)

map.remove(1);
map.remove(2);
map.remove(3);
console.log(map.get(1)); // null
