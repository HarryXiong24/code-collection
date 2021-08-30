// 深拷贝

export function deepClone(obj: any): any {
  if (typeof obj === 'object') {
    // 判断里面是对象还是数组
    let cloneTarget: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      // 递归
      cloneTarget[key] = deepClone(obj[key]);
    }
    return cloneTarget;
  } else {
    return obj;
  }
}

// test 
let res = deepClone({
  field1: 1,
  field2: undefined,
  field3: {
    child: ['child', { grandson: 'grandson' }],
  },
  field4: [2, 4, 8]
});
console.log(res);
