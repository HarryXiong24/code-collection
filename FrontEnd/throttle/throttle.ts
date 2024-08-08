// 如果你持续触发事件，每隔一段时间，只执行一次事件。

export function throttle(callback: (...args: any[]) => any, delay: number, immediate: boolean = false) {
  let timeout: number | null = null;

  return function (this: unknown, ...args: any[]) {
    if (immediate) {
      callback.apply(this, args);
      immediate = false;
      return;
    }
    if (!timeout) {
      timeout = setTimeout(() => {
        callback.apply(this, args);
        timeout = null;
      }, delay);
    }
  };
}

// test
const func = throttle(() => {
  console.log(5);
}, 3000);

// only execute once
func();
func();
func();
func();
func();
