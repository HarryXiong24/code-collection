// 模拟 call 函数

/*
 * 功能:
 * 1.将函数设为对象的属性
 * 2.执行&删除这个函数
 * 3.指定this到函数并传入给定参数执行函数
 * 4.如果不传入参数，默认指向为 window
 */

// 先写个接口定义该方法，不然会报错
interface Function {
  myCall: Function;
}

Function.prototype.myCall = function (context: any, ...args: any) {
  context = Object(context) || window;
  context.fn = this;
  const result = context.fn(...args);
  Reflect.deleteProperty(context, 'fn');
  return result;
};

// test
let m = 0;
let myCall = function (this: any, arg1: number, arg2: number) {
  console.log(this.m, arg1, arg2);
};
let myCallObj = {
  n: 1,
};

// myCall(5, 4);
myCall.myCall(myCallObj, 5, 4);
