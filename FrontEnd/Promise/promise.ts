export class MyPromise {
  private status: 'pending' | 'resolved' | 'rejected';
  private data?: any;
  private reason?: any;
  private onResolvedCallback: ((...args: any[]) => any)[];
  private onRejectedCallback: ((...args: any[]) => any)[];

  constructor(executor: (resolve: (value: any) => void, reject: (reason: any) => void) => void) {
    // Promise 当前的状态
    this.status = 'pending';
    // Promise 的值
    this.data = undefined;
    this.reason = undefined;
    // Promise resolve 时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    this.onResolvedCallback = [];
    // Promise reject 时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = [];

    if (typeof executor !== 'function') {
      throw TypeError('executor must be Function!');
    }

    const resolve = (value: any) => {
      if (this.status === 'pending') {
        this.status = 'resolved';
        this.data = value;
        for (let i = 0; i < this.onResolvedCallback.length; i++) {
          this.onResolvedCallback[i](value);
        }
      }
    };

    const reject = (reason: any) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        for (var i = 0; i < this.onRejectedCallback.length; i++) {
          this.onRejectedCallback[i](reason);
        }
      }
    };

    try {
      // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
      executor.call(this, resolve, reject); // 执行executor
    } catch (e) {
      reject(e);
    }
  }

  // then方法接收两个参数，onResolved，onRejected，分别为 Promise 成功或失败后的回调
  then(onResolved?: ((value: any) => any) | null, onRejected?: ((reason: any) => any) | null) {
    const self = this;

    // 如果 then 的参数不是function，则我们需要忽略它
    onResolved = typeof onResolved === 'function' ? onResolved : () => {};
    onRejected = typeof onRejected === 'function' ? onRejected : () => {};

    return new MyPromise((resolve: (value: any) => void, reject: (reason: any) => void) => {
      const fulfilled = () => {
        try {
          const x = onResolved && onResolved(self.data);
          if (x && x instanceof Promise) {
            // 如果 onResolved 的返回值是一个 Promise 对象，直接取它的结果做为结果
            x.then(resolve, reject);
          }
          // 否则，以它的返回值做为结果
          resolve(x);
        } catch (e) {
          // 如果出错，以捕获到的错误做为结果
          reject(e);
        }
      };

      const rejected = () => {
        try {
          const x = onRejected && onRejected(self.reason);
          if (x && x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      };

      switch (self.status) {
        case 'resolved':
          fulfilled();
          break;
        case 'rejected':
          rejected();
          break;
        default:
          // self.status === 'pending'
          // 如果当前的 Promise 还处于 pending 状态，我们并不能确定调用 onResolved 还是 onRejected，
          // 只能等到 Promise 的状态确定后，才能确实如何处理。
          // 所以我们需要把我们的两种情况的处理逻辑做为 callback 放入 promise (此处即this/self) 的回调数组里
          // 逻辑本身跟第一个 if 块内的几乎一致
          self.onResolvedCallback.push(fulfilled);
          self.onRejectedCallback.push(rejected);
          break;
      }
    });
  }

  catch(onRejected: any) {
    return this.then(null, onRejected);
  }
}

// test
const a = 5;

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

// test original promise
console.log('------');
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
