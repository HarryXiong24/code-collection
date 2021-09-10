// 函数节流

// 在函数需要频繁触发时，函数触发一次后，只有大于设定的执行周期后才会第二次执行改函数

export function throttle(callback: Function, delay: number, immediate: boolean) {
  let flag: boolean = true;
  return function(this: unknown, ...args: any) {
    if (immediate) {
      callback.apply(this, arguments);
      immediate = false;
      return;
    }
    if (!flag) { 
      return;
    }
    flag = false;
    setTimeout(() => {
      callback.apply(this, args);
      flag = true;
    }, delay);
  };
}
