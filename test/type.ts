// interface Test {
//   a: number;
//   b: string;
//   c: boolean;
// }

// type test = keyof Test;
// type test2 = Test['b'];

// let exam: test = 'a';
// let exam2: test2 = 'asdasd';

export interface IFoo {
  id: string
}
export interface IFoo2 {
  id: string
  [key: string]: string
}

type TFoo = {
  id: string
}

function foo(payload: Record<string, string>) {}

const iPayload: IFoo = {
  id: 'payload'
}

const iPayload2: IFoo2 = {
  id: 'payload'
}

const tPayload: TFoo = {
  id: 'payload'
}

/*
类型“IFoo”的参数不能赋给类型“Record<string, string>”的参数。
类型“IFoo”中缺少索引签名。
*/
// foo(iPayload)
// 正常执行
foo(iPayload2)
// 正常执行
foo(tPayload)
