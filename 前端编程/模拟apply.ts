// 模拟 apply 函数

// 先写个接口定义该方法，不然会报错
interface Function {
  myApply: Function;
}

Function.prototype.myApply = function(context: any, arr: any[]) {
  context = Object(context) || window;
  context.fn = this;
  let result;
  if (arr.length === 0) {
    result = context.fn();
  } else {
    result = context.fn(...arr);
  }
  Reflect.deleteProperty(context, 'fn');
  return result;
};


// test
let n = 0;
let myApply = function (this: any, arg1: number, arg2: number) {
  console.log(this.n, arg1, arg2);
};
let myApplyObj = {
  n: 1,
};

// myApply(5, 4);
myApply.myApply(myApplyObj, [5, 4]); 