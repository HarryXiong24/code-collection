// 1 Hello World

/**
 * 在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）
 * 期望是一个 string 类型
 * type HelloWorld = any
 * 你需要使得如下这行不会抛出异常
 * type test = Expect<Equal<HelloWorld, string>>
 */

// solution
export type HelloWorld = string;
