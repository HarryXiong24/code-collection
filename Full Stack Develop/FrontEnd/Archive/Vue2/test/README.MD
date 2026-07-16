# Vue 响应式原理

## Why I write this article

本篇章专门解释 Vue 的响应式原理。

开门见山，展示出目前市面上最流行的 Vue 响应式原理图解。

![img](C:\Users\HARRIX~1\AppData\Local\Temp\企业微信截图_16395576371683.png)

诚然，这张图概括的没有错误，但静态图只能描述数据流转的状态，但无法展现出各个步骤执行的时间顺序。在我深入的研究响应式原理后，我将结 各个步骤执行的时间顺序，进一步解释 Vue 响应式原理。

## Let's begin

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

### First Step

首先，在响应式原理概念里，vue 解析的时候会分两步走：

- data 里的数据被 Observer 处理

- 模板里的 {{ }} 数据，被 Complier 处理

我们分别看看这两步有什么作用。

### Observer 监听者

Observer 的作用其实就是让 data 里的数据全部被监听，被代理，变成响应式的。

而其中的使用的方法则是 defineProperty(Vue2)，proxy(Vue3)。

```ts
import Dep from './Dep';

/**
 * Observer 类会附加到一个被侦测的 object 上
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
   * 数据代理
   */
  defineReactive(data: Record<string, any>, key: PropertyKey, value: any) {
    // 如果 value 是对象，就需要递归，让对象里每一个属性都转换成 getter/setter 的形式来侦测变化
    if (typeof value === 'object') {
      this.walk(value);
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

  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方式只有在数据类型为 Object 的时候才会被调用
   */
  walk(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    // 递归
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
```

### {{ }} -> Watcher 订阅者

在 Complie 的过程中，每次碰到一个 {{ }} 模板，就会创建一个 Watcher。

有多少个 {{ }} 模板，我们就会创建多少个 Watcher，{{}} 和 Watcher 有着一一对应的关系。

因此，Watcher 之所以需要被创建，起作用主要是接受该属性变化的通知，然后去执行更新函数去更新视图（更新视图中 {{ }} 的部分），所以我们做的主要是有两步：

1. 把 Watcher 添加到 Dep 容器中，这里我们用到了 监听器的 get 函数
2. 接收到通知，执行更新函数。

```ts
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
```

### Watcher (依赖) 收集到哪里？

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
export default class Dep {
  private subs: any[];

  constructor() {
    this.subs = [];
  }

  addSub(sub: any) {
    this.subs.push(sub);
  }

  removeSub(sub: any) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }

  // window.target 实际上就是一个 watcher 对
  // 我们在 dep 实例中收集 watche r对象的目的就是在数据发生更新时，能够调用已经收集到的 watcher 对象的 update 方法来更新视图
  depend() {
    if ((window as any).target) {
      this.subs.push((window as any).target);
    }
  }

  notify() {
    // 拷贝一份，避免直接操作数据
    const subs = this.subs;
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}
```

### 如何收集依赖

读到这里，你就会发现，开篇的概念图我们基本已经讲完了。就剩最后 2 个流程：Dep 如何 添加订阅者 watcher，即如何收集依赖？还有如何触发依赖？

让我们回到 Observe 的代码中：

```ts
import Dep from './Dep';

/**
 * Observer 类会附加到一个被侦测的 object 上
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
   * 数据代理
   */
  defineReactive(data: Record<string, any>, key: PropertyKey, value: any) {
    // 如果 value 是对象，就需要递归，让对象里每一个属性都转换成 getter/setter 的形式来侦测变化
    if (typeof value === 'object') {
      this.walk(value);
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

  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方式只有在数据类型为 Object 的时候才会被调用
   */
  walk(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    // 递归
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
```

你会发现，其实就是在 getter 中收集依赖，因为页面通过 {{ }} 渲染 data 里的变量时， 一定要读取该变量的值、所以只需要在解析 {{ }} 创建 watcher 的中，去触发该变量被代理后的 getter 方法。在 setter 中去触发依赖，通知依赖进行批量更新。

```ts
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
```
