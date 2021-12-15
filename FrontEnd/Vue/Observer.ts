import { defineReactive } from './DefineReactive';

/**
 * Observer 类会附加到每一个被侦测的 object 上
 * 一旦被附加上，Observer 会将 object 的所有属性转换为 getter/setter 的形式
 * 从而来收集依赖，并且当属性发生变化的时候，会通知这些依赖
 */
export default class Observer {
  private value: any;
  constructor(value: any) {
    this.value = value;
    // value 只可能是数组和对象
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方式只有在数据类型为 Object 的时候才会被调用
   */
  walk(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    // 递归
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
