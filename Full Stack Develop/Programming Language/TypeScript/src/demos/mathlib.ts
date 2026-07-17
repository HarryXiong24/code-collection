/**
 * 一个「模块」= 一个文件。用 export 决定对外暴露什么，没 export 的就是模块私有。
 * 这是被 14-modules.ts 导入的示例模块。
 */

// 具名导出：可以有多个
export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export interface Point {
  x: number;
  y: number;
}

// 模块私有：没有 export，外部看不到，只能通过导出的函数间接使用
const HIDDEN = 'module-private';

export function reveal(): string {
  return HIDDEN;
}

// 默认导出：一个模块最多一个，导入时名字随便起
export default function greet(name: string): string {
  return `Hi, ${name}`;
}
