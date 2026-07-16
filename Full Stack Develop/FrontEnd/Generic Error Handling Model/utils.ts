/**
 * 假设有一个库，我们需要暴露一个通用的错误处理接口
 */

// 用户自定义的对此库的异常处理函数
let handleError: (...any: any[]) => any = (e) => {
  console.log(e);
};

export default {
  foo(fn: (...any: any[]) => any) {
    callWithErrorHandling(fn);
  },
  bar(fn: (...any: any[]) => any) {
    callWithErrorHandling(fn);
  },
  // 用户自定义的对此库的异常处理函数
  registerErrorHandler(fn: (...any: any[]) => any) {
    handleError = fn;
  },
};

function callWithErrorHandling(fn: (...any: any[]) => any) {
  try {
    fn && fn();
  } catch (e) {
    handleError(e);
  }
}
