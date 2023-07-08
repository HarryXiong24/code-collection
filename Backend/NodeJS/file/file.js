const path = require('path');
const fs = require('fs');

const resolve = (dir) => {
  return path.resolve('./NodeJS/test', dir);
};

// 异步读取文件
fs.readFile(resolve('test.js'), (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString('utf-8'));
  }
});

// 同步读取文件，打印的时候这个比异步先执行
const file = fs.readFileSync(resolve('test.js'));
console.log(file);

// 异步写文件
fs.writeFile(resolve('write.js'), file, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Write successfully!');
  }
});
