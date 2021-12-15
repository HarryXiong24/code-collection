/**
 * 解析 data.a.b.c，返回一个函数
 * 用例：
 * const vm = {
 *   a: {
 *     b: {
 *       c: 1,
 *     },
 *   },
 * };
 *
 * const func = parsePath('a.b')!;
 * console.log(func(vm));   // { c: 1 }
 */
export function parsePath(path: any) {
  const bailRE = /[^\w.$]/;
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj: Record<string, any>) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

export default class Watcher {
  private vm: Record<string, any>;
  private getter: ((obj: Record<string, any>) => Record<string, any> | undefined) | undefined;
  private callback: (newValue: any, oldValue: any) => any;
  private value: any;

  constructor(vm: Record<string, any>, expOrFn: string, callback: (newValue: any, oldValue: any) => any) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.callback = callback;
    this.value = this.get();
  }

  // 读取 data.b.c 的值
  get() {
    (window as any).target = this;
    const value = this.getter!.call(this.vm, this.vm);
    (window as any).target = undefined;
    return value;
  }

  // 更新
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.callback.call(this.vm, this.value, oldValue);
  }
}
