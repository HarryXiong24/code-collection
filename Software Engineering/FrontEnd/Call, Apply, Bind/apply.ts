(Function.prototype as any).myApply = function (this: any, context: any, args: any[]) {
  // avoid call Function.prototype.myApply() directly
  if (this === Function.prototype) {
    return undefined;
  }

  // 如果 context 是 null 或 undefined，则指向全局对象（浏览器中为 window，Node.js 中为 global）
  context = context || window;

  // 使用 Symbol 来防止覆盖 context 上已有的属性
  const fnKey = Symbol('fn');
  context[fnKey] = this;

  // 执行函数并传入参数
  let result = undefined;
  if (args.length === 0) {
    result = context.fn();
  } else {
    result = context[fnKey](...args);
  }

  // 删除临时属性
  Reflect.deleteProperty(context, fnKey);

  return result;
};

// test
let weight = 0;
let func = function (this: any, arg1: number, arg2: number) {
  return this.weight + arg1 + arg2;
};
let myApplyObj = {
  weight: 1,
};

// 测试调用
const res = (func as any).myApply(myApplyObj, [5, 4]); // 输出: 10
console.log(res);

export default res;
