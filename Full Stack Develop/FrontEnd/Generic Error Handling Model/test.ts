/**
 * 假设有一个库，我们需要暴露一个通用的错误处理接口
 */

export class Demo {
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

const utils_class = new Demo();

// 注册错误处理程序
utils_class.registerErrorHandler((e) => {
  console.log('registerErrorHandler', e);
});

// 不用在单独考虑错误处理的问题了，增强代码健壮性
utils_class.foo(() => {
  console.log('foo');
  throw new Error('error');
});
utils_class.bar(() => {
  console.log('bar');
});
