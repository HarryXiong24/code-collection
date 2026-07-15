# Mini-TS-Vue

## Description

A mini-vue framework developed by Typescript.

## Usage

```bash
# If you want to use yarn.
yarn
yarn dev
yarn build
```

```bash
# If you want to use npm.
npm install
npm run dev
npm run build
```

### Hint

The simple example is located in the examples folder, so the packaging file entry set by Webpack is located in index.ts under the examples folder.

The file in the directory under src is just an empty file. Please modify it yourself according to your needs.

## Vue 响应式原理

### Why I write this article

本篇章专门解释 Vue 的响应式原理。

开门见山，展示出目前市面上最流行的 Vue 响应式原理图解。

![img](./pubilc/assets/bind.png)

诚然，这张图概括的没有错误，但静态图只能描述数据流转的状态，但无法展现出各个步骤执行的时间顺序。在我深入的研究响应式原理后，我将结 各个步骤执行的时间顺序，进一步解释 Vue 响应式原理。

### Let's begin

首先有必须要说明，本篇章主要讲述 Vue 的响应式原理，所以在分析的过程中，我会淡化或者省略模板解析、vue 指令解析等一系列其他特征概念。并且，我将主要侧重流程、状态的运转说明，具体的代码实现我会提供但不会逐行解释。

我们通过一个例子来详细讲述:

```html
<body>
  <div id="app">
    <div>{{name}}</div>
    <div>{{age}}</div>
  </div>
  <script>
    let vm = new Vue({
      el: '#app',
      data: {
        name: 'harry',
        age: 21,
      },
    });
  </script>
</body>
```

#### First Step

首先，在响应式原理概念里，vue 解析的时候会分两步走：

- data 里的数据被 Observer 处理

- 模板里的 {{ }} 数据，被 Complier 处理

我们分别看看这两步有什么作用。

#### Observer 监听者

Observer 的作用其实就是让 data 里的数据全部被监听，被代理，变成响应式的。

而其中的使用的方法则是 defineProperty(Vue2)，proxy(Vue3)。

```ts
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
```

#### {{ }} -> Watcher 订阅者

在 Complie 的过程中，每次碰到一个 {{ }} 模板，就会创建一个 Watcher。

有多少个 {{ }} 模板，我们就会创建多少个 Watcher，{{}} 和 Watcher 有着一一对应的关系。

因此，Watcher 之所以需要被创建，起作用主要是接受该属性变化的通知，然后去执行更新函数去更新视图（更新视图中 {{ }} 的部分），所以我们做的主要是有两步：

1. 把 Watcher 添加到 Dep 容器中，这里我们用到了 监听器的 get 函数
2. 接收到通知，执行更新函数。

```ts
import Dep from './Dep';
import _get from './utils/_get';
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
    this.oldValue = _get(vm, key);
    // 设为空，放置重复添加
    Dep.target = null;
  }

  // 当数据发生变化的时候，即数据的 setter 触发的时候，更新视图
  update() {
    let newValue = _get(this.vm, this.key);
    if (this.oldValue === newValue) {
      return;
    }
    this.callback(newValue);
  }
}

export default Watcher;
```

#### Watcher (依赖) 收集到哪里？

因为在 Vue 中，{{ }} 里的变量其实都会存在与 data 中，所以此时 Observer 和 Watcher 无形之中就建立了某种联系。

是什么联系呢？怎么关联起来呢？就是靠 Dependency（依赖收集器）。

如果你看懂了上面的分析，你就会发现，Observer 一口气就可以监听完 data 里面所有的数据，而 watcher 则是 一个个零零散散的变量（这些变量都分布在 data 里面）。

所以，我们就有了思路，应该把这些 watcher 都收集起来，统一到一个容器里面。

因此，每一个 watcher 就是一个依赖。

然后我们会创建一个 Dep，就是一个依赖收集器。

显而易见，Dep 是一个管理者，所以 Dep 理所应当的具备一个管理者拥有的能力：

- 收集依赖（增加 watcher）
- 释放依赖 （删除 watcher）
- 通知（notify）自己管理的依赖应该什么时候进行更新（update）。

```ts
import Watcher from './Watcher';

/**
 * 收集依赖，添加观察者(watcher)
 * 通知所有观察者
 */
class Dep {
  public subs: Watcher[];
  public static target: Watcher | null;

  constructor() {
    this.subs = [];
  }

  // 添加观察者
  addSub(sub: Watcher) {
    if (sub) {
      this.subs.push(sub);
    }
  }

  // 移除观察者
  removeSub(sub: Watcher) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }

  // 发送通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

export default Dep;
```

#### 如何收集依赖

读到这里，你就会发现，开篇的概念图我们基本已经讲完了。就剩最后 2 个流程：Dep 如何 添加订阅者 watcher，即如何收集依赖？还有如何触发依赖？

让我们回到 Observe 的代码中：

```ts
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
```

你会发现，其实就是在 getter 中收集依赖，因为页面通过 {{ }} 渲染 data 里的变量时， 一定要读取该变量的值、所以只需要在解析 {{ }} 创建 watcher 的中，去触发该变量被代理后的 getter 方法。在 setter 中去触发依赖，通知依赖进行批量更新。

```ts
import Dep from './Dep';
import _get from './utils/_get';
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
    this.oldValue = _get(vm, key);
    // 设为空，放置重复添加
    Dep.target = null;
  }

  // 当数据发生变化的时候，即数据的 setter 触发的时候，更新视图
  update() {
    let newValue = _get(this.vm, this.key);
    if (this.oldValue === newValue) {
      return;
    }
    this.callback(newValue);
  }
}

export default Watcher;
```
