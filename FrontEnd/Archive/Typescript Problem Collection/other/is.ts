// is 关键字的使用方法

// 如果这么定义，虽然能心爱的那个返回值，但是不能自动的排除掉 arg 的检查问题
// export const isString = (arg: unknown): boolean => typeof arg === 'string';

// function testStr(numOrStr: number | string) {
//   if (isString(numOrStr)) {
//     console.log(numOrStr.length);
//   }
// }

// 应该使用 is 关键字
export const isString = (arg: unknown): arg is string => typeof arg === 'string';

function testStr(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log(numOrStr.length);
  }
}
