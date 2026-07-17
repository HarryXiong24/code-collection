import { note, show, title } from '../log.js';
// 具名导入：用 { } 按名字取，可用 as 改名；type 前缀只导入类型（编译后消失）
import greet, { PI, add, reveal, type Point } from './mathlib.js';
// 命名空间导入：把整个模块的导出收进一个对象
import * as mathlib from './mathlib.js';

/**
 * 模块 / 导入导出 / 可见性 —— TS 用 ES Module（ESM）组织代码。
 * 要点：
 *   1. 一个文件就是一个模块；顶层的 import/export 决定它的公开面。
 *   2. 具名导出可多个（import { a, b }）；默认导出最多一个（import x）。
 *   3. 没 export 的绑定是模块私有的，外部无法访问。
 *   4. import * as ns 把所有具名导出收进命名空间对象。
 *   5. import type 只导入类型，编译后被完全擦除，零运行时开销。
 */
export function modulesDemo(): void {
  title('14 模块 / 导入导出 / 可见性');

  note('具名导入：按名字取具名导出');
  show('PI', PI);
  show('add(2, 3)', add(2, 3));

  note('默认导入：名字随便起（这里叫 greet）');
  show('greet("Harry")', greet('Harry'));

  note('命名空间导入：所有具名导出收进一个对象');
  show('Object.keys(mathlib)', Object.keys(mathlib));

  note('模块私有：HIDDEN 没导出，只能经由导出的 reveal() 间接拿到');
  show('reveal()', reveal());

  note('import type：类型只存在于编译期，运行时没有它');
  const p: Point = { x: 1, y: 2 };
  show('用 Point 类型标注的值', p);

  note('import.meta：模块自身的元信息（ESM 特有）');
  show('import.meta.url 结尾', import.meta.url.split('/').slice(-2).join('/'));
}
