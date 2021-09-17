// 数组对象转化为树形结构

// 定义接口
interface Item {
  id: number;
  pid: number;
  name: string;
  children?: Item[];
}

export function arrayToTree(arr: Item[]): Item[] {
  let result: Item[] = [];

  // 如果不是数组，直接返回
  if (!Array.isArray(arr)) {
    return result;
  }

  // 先删除有 children 属性的 item
  arr.forEach((item: Item) => {
    delete item.children;
  });

  let map: any = {};

  // map 里的数据结构为
  // {
  //   "1": {"id":1,"pid":0,"name":"body"},
  //   "2": {"id":2,"pid":1,"name":"title"},
  //   "3": {"id":3,"pid":1,"name":"div"},
  //   "4": {"id":4,"pid":3,"name":"span"},
  //   "5": {"id":5,"pid":3,"name":"icon"},
  //   "6": {"id":6,"pid":4,"name":"subspan"}
  // }
  arr.forEach((item: Item) => {
    map[item.id] = item;
  });

  arr.forEach((item: Item) => {
    // 寻找 map[id] === map[item.pid] 的 parent
    let parent = map[item.pid];
    // 找到则往 parent.children 里面 push item，没找到说明 pid === 0 在第一层
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

// test
let res = arrayToTree([
  {
    id: 1,
    pid: 0,
    name: 'body',
  },
  {
    id: 2,
    pid: 1,
    name: 'title',
  },
  {
    id: 3,
    pid: 1,
    name: 'div',
  },
  {
    id: 4,
    pid: 3,
    name: 'span',
  },
  {
    id: 5,
    pid: 3,
    name: 'icon',
  },
  {
    id: 6,
    pid: 4,
    name: 'subspan',
  },
]);
console.log(res);

// result
// [
//   {
//     id: 1,
//     pid: 0,
//     name: 'body',
//     children: [
//       { id: 2, pid: 1, name: 'title' },
//       {
//         id: 3,
//         pid: 1,
//         name: 'div',
//         children: [
//           {
//             id: 4,
//             pid: 3,
//             name: 'span',
//             children: [{ id: 6, pid: 4, name: 'subspan' }],
//           },
//           { id: 5, pid: 3, name: 'icon' },
//         ],
//       },
//     ],
//   },
// ];
