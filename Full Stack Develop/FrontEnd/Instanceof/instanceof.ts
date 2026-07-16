// determine if the prototype of Object's constructor in is a' prototype chain

export function myInstanceof(target: Record<string, any>, origin: Function) {
  // target.__proto__ point to its prototype
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
