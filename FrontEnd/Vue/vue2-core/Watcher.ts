import Dep from './Dep';
import { VueType } from './Vue';
/**
 * 当数据变化触发依赖，dep 通知所有的 Watcher 实例更新视图
 * 自身实例化的时候往 dep 对象中添加自己
 */
class Watcher {
  // Vue 实例
  public vm: VueType;
  // data 中的属性名称
  public key: string;
  // 当数据变化的时候，调用 callback 更新视图
  public callback: (newValue: any) => any;
  // 原来的旧值
  public oldValue: any;

  constructor(vm: VueType, key: string, callback: (newValue: any) => any) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    // 在 Dep 的静态属性上记录当前 watcher 对象，当访问数据的时候把 watcher 添加到 dep 的 subs 中
    Dep.target = this;
    // 访问vm[key]，触发一次 getter，让 dep 为当前 key 记录 watcher
    this.oldValue = vm[key];
    // 设为空，放置重复添加
    Dep.target = null;
  }

  // 当数据发生变化的时候，即数据的 setter 触发的时候，更新视图
  update() {
    let newValue = this.vm[this.key];
    if (this.oldValue === newValue) {
      return;
    }
    this.callback(newValue);
  }
}

export default Watcher;
