# EventEmitter

## Intro

一个简单的 EventEmitter，帮助你实现事件的订阅-发布机制。

原生 TypeScipt 实现，无依赖。

## Usage

```ts
import eventEmitter from 'EventEmitter';
```

## API

### init

```ts
let emitter = new EventEmitter();
```

### on

添加一个事件监听器，支持链式调用

```ts
emitter.on(eventName, listener);
```

- eventName 事件名称
- listener 监听器函数

### once

添加一个只能触发一次的事件监听器，支持链式调用

```ts
emitter.once(eventName, listener);
```

- eventName 事件名称
- listener 监听器函数

### Off

删除某个事件名下的所有事件，支持链式调用

```ts
emitter.Off(eventName);
```

- eventName 事件名称 如果不传，则删除所有事件

### offItem

删除一个事件名下的指定事件，支持链式调用

```ts
emitter.off(eventName, listener);
```

- eventName 事件名称
- listener 监听器函数

### emit

触发事件，支持链式调用

```ts
emitter.emit(eventName, args);
```

- eventName 事件名称
- args 以逗号形式传入，传入事件监听器的参数

### clear

清空所有事件，重新初始化

```ts
emitter.clear();
```

## Demo

### 添加、触发、删除事件

```ts
const emitter = new EventEmitter();

const func1 = () => {};
const func2 = (a: number, b: number, c: number) => {
  console.log('func2', a, b, c);
};

emitter.on('num1', func1);

emitter.on('num2', () => {});
emitter
  .once('num2', func2)
  ?.on('num2', () => {})
  ?.once('num2', () => {})
  ?.on('num3', () => {});

emitter.offItem('num1', func1)?.off('num4')?.off('num3');

emitter.emit('num2', 1, 2, 3);

console.log(emitter._events);

emitter.clear();
console.log(emitter._events);
```

### 支持在监听器函数中删除未执行的某个事件

```ts
var emitter = new EventEmitter();

function handleOne(a, b, c) {
  console.log('第一个监听函数', a, b, c);
  emitter.off('demo', handleSecond);
}

function handleSecond(a, b, c) {
  console.log('第二个监听函数', a, b, c);
}

function handleThird(a, b, c) {
  console.log('第三个监听函数', a, b, c);
}

emitter.on('demo', handleOne).on('demo', handleSecond).on('demo', handleThird);

emitter.emit('demo', [1, 2, 3]);

// => 第一个监听函数 1 2 3
// => 第三个监听函数 1 2 3
```
