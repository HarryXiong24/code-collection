export class MyPromise<T> {
  private status: 'pending' | 'resolved' | 'rejected';
  private data?: T;
  private reason?: any;
  private onResolvedCallback: ((...args: any[]) => void)[];
  private onRejectedCallback: ((...args: any[]) => void)[];

  constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    // Promise 当前的状态
    this.status = 'pending';
    // Promise 的值
    this.data = undefined;
    this.reason = undefined;
    // Promise resolve 时的回调函数集，因为在 Promise 结束之前有可能有多个回调添加到它上面
    this.onResolvedCallback = [];
    // Promise reject 时的回调函数集，因为在 Promise 结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = [];

    if (typeof executor !== 'function') {
      throw TypeError('executor must be Function!');
    }

    const resolved = (value: T) => {
      if (this.status === 'pending') {
        // use setTimeout to alter the Micro Task Queue, so the task will be input in Macro Task Queue
        setTimeout(() => {
          this.status = 'resolved';
          this.data = value;
          // 触发所有的 resolve 回调
          this.onResolvedCallback.forEach((callback) => callback(value));
        }, 0);
      }
    };

    const rejected = (reason: any) => {
      if (this.status === 'pending') {
        // use setTimeout to alter the Micro Task Queue, so the task will be input in Macro Task Queue
        setTimeout(() => {
          this.status = 'rejected';
          this.reason = reason;
          // 触发所有的 reject 回调
          this.onRejectedCallback.forEach((callback) => callback(reason));
        }, 0);
      }
    };

    try {
      // 考虑到执行 executor 的过程中有可能出错，所以我们用 try/catch 块给包起来，并且在出错后以 catch 到的值reject 掉这个 Promise
      executor.call(this, resolved, rejected); // 执行executor
    } catch (e) {
      rejected(e);
    }
  }

  // then方法接收两个参数，onResolved，onRejected，分别为 Promise 成功或失败后的回调
  then(onResolved?: ((value: T) => any) | null, onRejected?: ((reason: any) => any) | null): MyPromise<T> {
    // 如果 then 的参数不是function，则我们需要忽略它
    onResolved = typeof onResolved === 'function' ? onResolved : (value: T) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason: any) => {
            throw reason;
          };

    return new MyPromise<T>((resolve, reject) => {
      const resolved = () => {
        setTimeout(() => {
          try {
            const result = onResolved && onResolved(this.data!); // 调用 onResolved，并确保类型安全
            this.resolvePromise(result, resolve, reject); // 如果返回值是一个 Promise，需要处理它
          } catch (e) {
            reject(e);
          }
        }, 0);
      };

      const rejected = () => {
        setTimeout(() => {
          try {
            const result = onRejected && onRejected(this.reason); // 调用 onRejected，并确保类型安全
            this.resolvePromise(result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };

      switch (this.status) {
        case 'resolved':
          resolved();
          break;
        case 'rejected':
          rejected();
          break;
        default:
          // demo case
          // const pendingPromise = new MyPromise<number>((resolve, reject) => {
          //   // 不调用 resolve 或 reject，Promise 会一直保持 pending 状态
          //   console.log('Promise is pending...');
          //   setTimeout(() => {
          //     resolve(1);
          //   }, 3000);
          // });

          // pendingPromise
          //   .then((value) => {
          //     console.log('This will not be called, because the promise is pending 1 :', value);
          //     return value + 1;
          //   })
          //   .then((value) => {
          //     console.log('This will not be called, because the promise is pending 2:', value);
          //   })
          //   .catch((reason) => {
          //     console.log('This will not be called either, because the promise is pending:', reason);
          //   });
          this.onResolvedCallback.push(resolved);
          this.onRejectedCallback.push(rejected);
          break;
      }
    });
  }

  catch(onRejected: (reason: any) => void): MyPromise<T> {
    // catch 实际上是调用 then 方法的简写版本，只处理错误情况
    return this.then(null, onRejected);
  }

  // 用于处理 then 中 onResolved 或 onRejected 返回值的逻辑
  private resolvePromise(result: any, resolve: (value: T) => void, reject: (reason: any) => void) {
    if (result === this) {
      reject(new TypeError('Chaining cycle detected for promise'));
    } else if (result && (typeof result === 'object' || typeof result === 'function')) {
      let then = undefined;
      try {
        then = result.then;
        if (typeof then === 'function') {
          // demo case
          // const myPromise = new MyPromise((resolve, reject) => {
          //   const thenable = {
          //     then: function (resolve: (value: any) => void) {
          //       setTimeout(() => {
          //         resolve("thenable object value");
          //       }, 1000);
          //     }
          //   };
          //   resolve(thenable);
          // });

          // myPromise.then((value) => {
          //   console.log("Resolved with:", value);
          // });
          then.call(
            result,
            (y: any) => this.resolvePromise(y, resolve, reject),
            (r: any) => reject(r)
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    } else {
      resolve(result);
    }
  }
}

// test
const a = 5;

// test original promise
console.log('Original Promise ------');
const promise = new Promise((resolve: (value: string) => void, reject) => {
  if (a > 0) {
    resolve('success');
  } else {
    reject('error');
  }
})
  .then((value: string) => {
    console.log('then1', value);
    return value;
  })
  .then((value: string) => {
    console.log('then2', value);
  })
  .then((value: any) => {
    console.log('then3', value);
  });

console.log(promise);

// test my promise
console.log('My Promise ------');
const myPromise = new MyPromise((resolve: (value: string) => void, reject) => {
  if (a > 0) {
    resolve('success');
  } else {
    reject('error');
  }
})
  .then((value: string) => {
    console.log('then1', value);
    return value;
  })
  .then((value: string) => {
    console.log('then2', value);
  })
  .then((value: any) => {
    console.log('then3', value);
  });

console.log(myPromise);
