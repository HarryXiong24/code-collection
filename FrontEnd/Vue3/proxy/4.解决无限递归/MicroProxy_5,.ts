interface Effect {
  (...any: any[]): any;
  deps: Array<Set<(...any: any[]) => any>>;
}

type KeyMap = Map<string, Set<Effect>>;

type TargetMap = WeakMap<Record<string, any>, KeyMap>;

// 存储代理对象的桶
const bucket: TargetMap = new WeakMap();

// 通用 effect
let activeEffect: Effect;
// effect 栈，用来保存嵌套的 effect
const effectStack: Effect[] = [];

function effect(fn: (...any: any[]) => any) {
  const effectFn: Effect = () => {
    cleanup(effectFn);
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn;
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn);
    fn();
    // 在当前副作用函数执行完毕之后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  // activeEffect.deps 用来存储所有与该副作用函数想关联的依赖集合
  effectFn.deps = [];
  // 执行副作用函数
  effectFn();
}

function cleanup(effectFn: Effect) {
  // 遍历 deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

// 原始数据
const data: Record<string, any> = {
  text: 'hello word',
};

// 代理
// WeakMap: target --> Map
// Map: key --> Set(effects list)
const obj = new Proxy(data, {
  get(target: Record<string, any>, key: string) {
    track(target, key);
    return target[key];
  },
  set(target: Record<string, any>, key: string, newValue: any) {
    target[key] = newValue;
    trigger(target, key);
    return true;
  },
});

// 用于 get 函数中追踪变化
function track(target: Record<string, any>, key: string) {
  // 没有 activeEffect 直接返回
  if (!activeEffect) {
    return;
  }
  // 从 WeakMap 中取出当前对象（更新时情况）
  let depsMap = bucket.get(target);
  // 如果没有则新建（第一次时情况）
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map<string, Set<Effect>>()));
  }
  // 取出指定对象属性里的 effects list
  let deps = depsMap.get(key);
  // 没有则新建
  if (!deps) {
    depsMap.set(key, (deps = new Set<Effect>()));
  }
  // 将当前副作用函数存入
  deps.add(activeEffect);
  // deps 就是一个与当前副作用函数存在练习的依赖集合
  activeEffect.deps.push(deps);
}

// 用于 set 函数中触发变化
function trigger(target: Record<string, any>, key: string) {
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);

  // 把收集的副作用都执行一遍
  const effectsToRun = new Set<Effect>();
  effects &&
    effects.forEach((effectFn) => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  effectsToRun.forEach((fn) => fn());
}

// 测试
let html = '';
const changeText = () => {
  html = obj.text;
  console.log('effect run', html);
};
effect(changeText);
// 1 秒后修改响应式数据
setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);

// 必须模块化才不会报错，测试的时候可以删除这一句
export default obj;
