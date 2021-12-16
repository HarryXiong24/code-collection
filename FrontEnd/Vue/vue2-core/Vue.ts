import Observer from './Observer';
import Compiler from './Compiler';

export interface Options {
  data: Record<string, any>;
  el: string | HTMLElement;
}

export interface VueType {
  $options: Options;
  $data: Record<string, any>;
  $el: HTMLElement;
  [propName: string]: any;
}

/**
 * 实现功能
 * 负责接收初始化的参数(选项)
 * 负责把 data 中的属性注入到 Vue 实例
 * 负责调用 observer 监听 data 中所有属性的变化，转换成 getter/setter
 * 负责调用 compiler 解析指令/插值表达式
 */
export class Vue implements VueType {
  public $options: Options;
  public $data: Record<string, any>;
  public $el: HTMLElement;

  constructor(options: Options) {
    // 通过属性保存选项的数据
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el)! : options.el;
    // 负责调用 Observer 实现数据劫持
    // Observer 类会附加到每一个被侦测的 object，Observer 会将 object 的所有属性转换为 getter/setter 的形式
    new Observer(this.$data);
    // 负责把 data 注入到 Vue 实例的 this 中
    // 因为目前的数据全部在 this.$data 上，而我们需要把数据放在 this 上，以供 Compiler 解析
    this._proxyData(this.$data);
    // 负责调用 Compiler 解析指令/插值表达式等
    new Compiler(this);
  }

  // 把 data 的属性注入到 Vue 实例中
  _proxyData(data: Record<string, any>) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}

export default Vue;
