/**
 * 功能
 * 负责把 data 选项中的属性转换成响应式数据
 * data 中的某个属性也是对象，把该属性转换成响应式数据
 * 数据变化发送通知
 */

import Dep from './Dep';

/**
 * Observer 类会附加到一个被侦测的 object 上
 * 一旦被附加上，Observer 会将 object 的所有属性转换为 getter/setter 的形式
 * 从而来收集依赖，并且当属性发生变化的时候，会通知这些依赖
 */
class Observer {
  constructor(data: Record<string, any>) {
    this.walk(data);
  }

  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方式只有在数据类型为 Object 的时候才会被调用
   */
  walk(data: Record<string, any>): void {
    // 判断数据是否是对象，如果不是对象返回
    if (!data || typeof data !== 'object') {
      return;
    }
    // 如果是对象，遍历对象的所有属性，设置为 getter/setter
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  /**
   * 数据代理
   */
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
