// 防抖的原理就是：尽管触发事件，但是一定在事件触发 n 秒后才执行，如果在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等触发完事件 n 秒内不再触发事件才执行

export function debounce(callback: (...args: any[]) => any, delay: number, immediate: boolean = false) {
  let timer: number | undefined = undefined;

  return function (this: unknown, ...args: any[]) {
    if (immediate) {
      callback.apply(this, args);
      immediate = false;
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      // because of arrow function, we can use this directly, it doesn't need context
      callback.apply(this, args);
    }, delay);
  };
}

// test
const func = debounce(() => {
  console.log(5);
}, 3000);
func();
