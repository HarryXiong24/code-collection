/**
 * 假设有一个库，我们需要暴露一个通用的错误处理接口
 */

class Demo {
  // 用户自定义的对此库的异常处理函数
  private handleError: (...any: any[]) => any;

  constructor() {
    this.handleError = (e) => {
      console.log(e);
    };
  }

  foo(fn: (...any: any[]) => any) {
    this.callWithErrorHandling(fn);
  }

  bar(fn: (...any: any[]) => any) {
    this.callWithErrorHandling(fn);
  }

  // 用户自定义的对此库的异常处理函数
  registerErrorHandler(fn: (...any: any[]) => any) {
    this.handleError = fn;
  }

  private callWithErrorHandling(fn: (...any: any[]) => any) {
    try {
      fn && fn();
    } catch (e) {
      this.handleError(e);
    }
  }
}

export default new Demo();
