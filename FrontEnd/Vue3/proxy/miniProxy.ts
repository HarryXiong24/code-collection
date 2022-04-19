// 存储副作用的桶
const bucket = new Set<(...any: any[]) => any>();

// 原始数据
const data: Record<string, any> = {
  text: 'hello word',
};

// 代理
const obj = new Proxy(data, {
  get(target: Record<string, any>, key: string) {
    // 将副作用函数存入桶
    bucket.add(effect);
    return target[key];
  },
  set(target: Record<string, any>, key: string, newValue: any) {
    target[key] = newValue;
    // 把收集的副作用都执行一遍
    bucket.forEach((fn) => fn());
    return true;
  },
});

// 测试
let html = '';
const effect = () => {
  html = obj.text;
  console.log(html);
};
// 执行副作用函数，触发读取
effect();
// 1 秒后修改响应式数据
setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);
