// const arr = [1, 2, 3, 4];

// for (let item of arr) {
//   if (item === 3) {
//     console.log('Break');
//     break;
//   }
//   console.log(item);
// }

// function* generator() {
//   console.log('111');
//   yield 123 + 789;
// }

// const fun = generator();

// console.log(fun.next());
// fun.next();
// fun.next();

// const example = new Promise((resolve) => {
//   console.log('aaa');
//   resolve('bbb');
// });

// example.then((str) => {
//   console.log(str);
// });

// function Test() {
//   console.log('1');
// }

// console.log(Test);

// const text =
//   '这是一段包含链接的文本，链接地址是：https://www.google.com 和 http://www.baidu.com ，另外还有一个链接：https://github.com/Raoul1996\n';
// const regex = /(https?:\/\/\S+)(?=\s|$)/gi;
// const links = text.match(regex);
// console.log(links); // ["https://www.google.com ", "http://www.baidu.com，", "https://github.com/Raoul1996"]

function fib(n: number): number {
  const recursive = (current: number): number => {
    if (current === 0) {
      return 0;
    }
    if (current === 1) {
      return 1;
    }
    return recursive(current - 1) + recursive(current - 2);
  };

  return recursive(n);
}

console.log(fib(4));
