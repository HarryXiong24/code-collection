// a instanceof Object
// 判断 Object 构造函数的 prototype 是否在 a 的原型链上。

/**
 * 实现
 * @param target
 * @param origin
 * @returns
 */
export function myInstanceof(target: Record<string, any>, origin: Function) {
  const proto = target.__proto__;
  if (proto) {
    if (origin.prototype === proto) {
      return true;
    } else {
      myInstanceof(proto, origin);
    }
  } else {
    return false;
  }
}

// test
console.log({ a: 1 } instanceof Object);
console.log(myInstanceof({ a: 1 }, Object));
