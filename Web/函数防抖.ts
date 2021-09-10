// 函数防抖

// 在规定时间内，只让最后一次的处理事件的效果生效，而让前面的处理事件不生效

function debounce(callback: Function, delay: number, immediate: boolean = false): Function {
  let timer: number | undefined = undefined;
  return function(this: unknown, ...args: any) {
    if (immediate) {
      callback.apply(this, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    // 将定时器挂载到函数对象上
    timer = setTimeout(() => {
      // 因为是箭头函数其实可以不在外部保存this直接绑定this
      callback.apply(this, args);
    }, delay);
  };
}

let res = debounce(() => {
  console.log(5); 
}, 3000);
