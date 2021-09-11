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

Function.prototype.myCall = function(context: any, ...args: any) {
  context.fn = this;
  const result = context.fn(...args);
  Reflect.deleteProperty(context, 'fn');
  return result;
}

// test
var n = 0;
let fun = function(this: any, arg1: number, arg2: number) {
  console.log(this.n, arg1, arg2);
}
let obj = {
  n: 1
};

fun(5, 4);
fun.myCall(obj, 5, 4); 