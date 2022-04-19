// 存储副作用的桶
const bucket = new WeakMap<Record<string, any>>();

// 通用 effect
let activeEffect: (...any: any[]) => any;
function effect(fn: (...any: any[]) => any) {
  activeEffect = fn;
  fn();
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
    // 没有 activeEffect 直接返回
    if (!activeEffect) {
      return;
    }
    // 从 WeakMap 中取出当前对象（更新时情况）
    let depsMap = bucket.get(target);
    // 如果没有则新建（第一次时情况）
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }
    // 取出指定对象属性里的 effects list
    let deps = depsMap.get(key);
    // 没有则新建
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }
    // 将当前副作用函数存入桶
    deps.add(activeEffect);
    return target[key];
  },
  set(target: Record<string, any>, key: string, newValue: any) {
    target[key] = newValue;
    const depsMap = bucket.get(target);
    if (!depsMap) {
      return true;
    }
    const effects = depsMap.get(key);
    // 把收集的副作用都执行一遍
    effects && effects.forEach((fn: (...any: any[]) => any) => fn());
    return true;
  },
});

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
