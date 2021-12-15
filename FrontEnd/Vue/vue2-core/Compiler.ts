import { VueType } from './vue';
import Watcher from './Watcher';
/**
 * 功能
 * 负责编译模板，解析指令/插值表达式
 * 负责页面的首次渲染
 * 当数据变化后重新渲染视图
 */
class Compiler {
  public vm: VueType;
  public el: HTMLElement;

  constructor(vm: VueType) {
    this.vm = vm;
    this.el = vm.$el;
    this.compile(this.el);
  }

  // 编译模板，处理文本节点和元素节点
  compile(el: HTMLElement) {
    // 获取所有子节点
    let childNodes = el.childNodes;
    // 转化成真数组
    Array.from(childNodes).forEach((node: any) => {
      // 判断是文本节点还是元素节点
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
      }

      // 如果当前节点中还有子节点，递归编译
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  // 编译元素节点，处理指令
  // 处理 v-text 的首次渲染
  // 处理 v-model 的首次渲染
  compileElement(node: HTMLElement) {
    // 遍历元素节点中的所有属性，找到指令
    Array.from(node.attributes).forEach((attr) => {
      // 获取元素属性的名称
      let attrName = attr.name;
      // 判断当前的属性名称是否是指令
      if (this.isDirective(attrName)) {
        // attrName 的形式 v-text v-model
        // 截取属性的名称，v-text --> text，v-model --> model
        attrName = attrName.substr(2);
        // 获取属性的名称，属性的名称就是我们数据对象的属性 v-text = "name"，获取的是 name
        let key = attr.value;
        // 处理不同的指令
        this.update(node, key, attrName);
      }
    });
  }

  // 编译文本节点，处理差值表达式
  compileText(node: Node) {
    // {{}}的正则匹配
    const reg = /\{\{(.+)\}\}/;
    if (!node.textContent) {
      return;
    }
    // 获取文本节点的内容
    let value = node.textContent;
    if (reg.test(value)) {
      // 插值表达式中的值就是我们要的属性名称
      // RegExp.$1获取第一个匹配的内容
      const key = RegExp.$1.trim();
      // 把插值表达式替换成具体的值
      node.textContent = value.replace(reg, this.vm[key]);

      // 创建Watcher对象
      new Watcher(this.vm, key, (newValue: any) => {
        node.textContent = newValue;
      });
    }
  }

  // 判断元素属性是否是指令
  isDirective(attrName: string): boolean {
    return attrName.startsWith('v-');
  }

  // 判断节点是否是文本节点
  isTextNode(node: Node): boolean {
    return node.nodeType === 3;
  }

  // 判断节点是否是元素节点
  isElementNode(node: Node): boolean {
    return node.nodeType === 1;
  }

  // 负责更新 DOM
  // 创建 Watcher
  // node 节点，key 数据的属性名称，dir 指令的后半部分
  update(node: Node, key: string, dir: string) {
    const updaterFn = (this as any)[`${dir}Updater`];
    updaterFn && updaterFn.call(this, node, key, this.vm[key]);
  }

  // v-text 指令的更新方法
  textUpdater(node: HTMLElement, key: string, value: any) {
    node.textContent = value;
    // 创建Watcher对象
    new Watcher(this.vm, key, (newValue: any) => {
      node.textContent = newValue;
    });
  }

  // v-model 指令的更新方法
  modelUpdater(node: HTMLInputElement, key: string, value: any) {
    node.value = value;
    // 创建Watcher对象
    new Watcher(this.vm, key, (newValue: any) => {
      node.value = newValue;
    });
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value;
    });
  }
}

export default Compiler;
