/**
 * 功能
 * 负责把 data 选项中的属性转换成响应式数据
 * data 中的某个属性也是对象，把该属性转换成响应式数据
 * 数据变化发送通知
 */

import Dep from './Dep';

// 负责数据劫持,把 $data 中的成员转换成 getter/setter
class Observer {
  constructor(data: Record<string, any>) {
    this.walk(data);
  }

  // 1.判断数据是否是对象，如果不是对象返回
  // 2.如果是对象，遍历对象的所有属性，设置为 getter/setter
  walk(data: Record<string, any>): void {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  // 定义响应式成员
  defineReactive(obj: Record<string, any>, key: string, value: any) {
    const that = this;
    // 收集依赖，发送通知
    let dep = new Dep();
    // 如果 value 是对象，继续设置它里面的成员为响应式数据
    this.walk(value);
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        // 如果 newValue 是对象，设置 newValue 的成员为响应式
        // 使用 that 的原因是 set 里面存在自己的 this
        that.walk(newValue);
        // 发送依赖
        dep.notify();
      },
    });
  }
}

export default Observer;
