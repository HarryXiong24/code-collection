// 集合

/*
 * 功能
 * 1.向集合添加一个新元素
 * 2.从集合移除一个元素
 * 3.如果元素在集合中，返回 true，否则返回 false
 * 4.移除集合中的所有元素
 * 5.返回集合所包含元素的数量
 * 6.返回一个包含集合中所有值（元素）的数组
 * 7.返回与其他集合的并集
 * 8.返回与其他集合的交集
 * 9.返回与其他集合的差集
 * 10.返回是否为其他集合的子集
 * 11.判断集合是否为空
 * 12.将 Set 转换成 AdvancedSet
 * 13.将 AdvancedSet 转换成 Set
 */

export class AdvancedSet<T> {
  public items: Set<T>;

  constructor(arr?: T[]) {
    this.items = new Set<T>(arr);
  }

  // 向集合添加一个新元素
  add(value: T): boolean {
    if (this.items.has(value)) {
      return false;
    } else {
      this.items.add(value);
      return true;
    }
  }

  // 从集合移除一个元素
  delete(value: T): T | boolean {
    if (this.items.has(value)) {
      return this.items.delete(value);
    } else {
      return false;
    }
  }

  // 如果元素在集合中，返回 true，否则返回 false
  has(value: T): boolean {
    return this.items.has(value);
  }

  // 移除集合中的所有元素
  clear(): void {
    this.items = new Set<T>();
  }

  // 判断集合是否为空
  isEmpty(): boolean {
    return this.size() === 0;
  }
  
  // 返回集合所包含元素的数量
  size(): number {
    return this.items.size;
  }
  
  // 返回一个包含集合中所有值（元素）的数组
  toArray(): T[] {
    return [...this.items];
  }

  // 将 Set 转换成 AdvancedSet
  toAdvancedSet(paramSet: Set<T>): AdvancedSet<T> {
    const advancedSet = new AdvancedSet<T>([...paramSet]);
    return advancedSet;
  }

  // 将 AdvancedSet 转换成 Set
  toSet(): Set<T> {
    const set = new Set<T>(this.toArray());
    return set;
  }

  // 返回与其他集合的并集
  union(paramSet: AdvancedSet<T>): AdvancedSet<T> {
    const unionSet: AdvancedSet<T> = new AdvancedSet<T>();

    this.toArray().forEach((value) => {
      unionSet.add(value);
    });
    paramSet.toArray().forEach((value) => {
      unionSet.add(value);
    })

    return unionSet;
  }
  
  // 返回与其他集合的交集
  intersection(paramSet: AdvancedSet<T>): AdvancedSet<T> {
    const intersectionSet: AdvancedSet<T> = new AdvancedSet<T>();

    this.toArray().filter((value) => {
      return paramSet.has(value);
    }).forEach((value) => {
      intersectionSet.add(value);
    })
    
    return intersectionSet;
  }
  
  // 返回与其他集合的差集
  difference(paramSet: AdvancedSet<T>): AdvancedSet<T> {
    const differenceSet: AdvancedSet<T> = new AdvancedSet<T>();
    
    this.toArray().filter((value) => {
      return !paramSet.has(value);
    }).forEach((value) => {
      differenceSet.add(value);
    })
  
    return differenceSet;
  }
  
  // 返回是否为其他集合的子集
  isSubsetOf(paramSet: AdvancedSet<T>): boolean {
    let result = true;
    this.toArray().forEach((value) => {
      if (paramSet.has(value) === false) {
        result = false;
      }
    })
    return result;
  }
}

// test
let advancedSet = new AdvancedSet<number>([1, 2, 8, 9]);
console.log(advancedSet.toArray());
console.log(advancedSet.difference(new AdvancedSet<number>([1])).toArray());
console.log(advancedSet.intersection(new AdvancedSet<number>([1])).toArray());
console.log(advancedSet.union(new AdvancedSet<number>([10, 5])).toArray());
console.log(advancedSet.isSubsetOf(new AdvancedSet<number>([10, 5])));
