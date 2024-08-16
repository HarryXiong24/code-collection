(Function.prototype as any).myBind = function (this: any, context: any, ...args1: any[]) {
  if (this === Function.prototype) {
    return undefined;
  }

  const _this = this;
  return function F(this: any, ...args2: any[]) {
    // 判断是否用于构造函数
    if (this instanceof F) {
      return new (_this as any)(...args1, ...args2);
    }
    return _this.apply(context, args1.concat(args2));
  };
};

// test
let weight = 0;
let func = function (this: any, arg1: number, arg2: number) {
  return this.weight + arg1 + arg2;
};
let myBindObj = {
  weight: 1,
};

const newFunc = (func as any).myBind(myBindObj, 5, 4);
const res = newFunc();
console.log(res);

export default res;
