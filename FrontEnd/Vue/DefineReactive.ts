import Dep from './Dep';
import Observer from './Observer';

export function defineReactive(data: Record<string, any>, key: PropertyKey, value: any) {
  // 如果 value 是对象，就需要递归，让对象里每一个属性都转换成 getter/setter 的形式来侦测变化
  if (typeof value === 'object') {
    new Observer(value);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      if ((value = newValue)) {
        return;
      }
      value = newValue;
      dep.notify();
    },
  });
}
