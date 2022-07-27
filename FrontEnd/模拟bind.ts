interface Function {
  myBind: Function;
}

Function.prototype.myBind = function (context: any, ...args1: any[]) {
  if (this === Function.prototype) {
    throw new TypeError('Error');
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
let b = 0;
let myBind = function (this: any, arg1: number, arg2: number) {
  console.log(this.b, arg1, arg2);
};
let myBindObj = {
  b: 1,
};

const res = myBind.myBind(myBindObj, 5, 4);
res();
