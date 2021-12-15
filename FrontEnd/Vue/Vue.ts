import Observer from './Observer';
import Watcher from './Watcher';

export interface Options {
  el: HTMLElement;
  exp: string;
  data: Record<string, any>;
}

// Vue 类，用于初始化
export default class Vue {
  private el: HTMLElement;
  private exp: string;
  private data: Record<string, any>;

  constructor(options: Options) {
    this.el = options.el;
    this.exp = options.exp;
    this.data = options.data;
    // 初始化页面内容
    this.el.innerHTML = this.data[this.exp];
    // 监听 data 里面的所有属性
    const observer = new Observer(this.data);
    new Watcher(this, this.exp, (val) => {
      // 创建 watcher 实例，调用构造函数。
      this.el.innerHTML = val;
    });
    return this;
  }
}
