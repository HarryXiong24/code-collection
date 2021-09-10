// 事件监听

export class EventEmitter {
  public _events: Map<string, Function>;
  public _count: number;

  constructor() {
    this._events = new Map(); // 储存事件/回调键值对
    this._count = 0; // 设立监听上限
  }

  // 触发名为 name 的事件
  emit(name: string, ...args: any): boolean {
    let handler: Function;
    // 从储存事件键值对的this._events中获取对应事件回调函数
    if (this._events.has(name)) {
      handler = this._events.get(name)!;
      if (args.length > 0) {
        handler.apply(this, args);
      } else {
        handler.call(this);
      }
      return true;
    } else {
      console.log('There is no this event!');
      return false;
    }
  }

  // 监听名为 name 的事件
  addListener(name: string, callback: Function): boolean {
    // 将type事件以及对应的fn函数放入this._events中储存
    if (!this._events.has(name)) {
      this._events.set(name, callback);
      this._count++;
      return true;
    } else {
      console.log('This event has been already added!');
      return false;
    }
  };

  // 移除名为 name 的事件
  removeListener(name: string, callback: Function | undefined = undefined): boolean {
    // 先判断是否有该事件
    if (this._events.has(name)) {
      this._events.delete(name);
      this._count--;
      callback?.call(this);
      return true;
    } else {
      console.log('There is no this event!');
      return false;
    }
  };
}

// test
let myEvent = new EventEmitter();

myEvent.addListener('logA', () => {
  console.log('A');
})
myEvent.emit('logA');

myEvent.addListener('logB', () => {
  console.log('B');
})
myEvent.emit('logB');

console.log(myEvent._events);
console.log(myEvent._count);

myEvent.removeListener('logB', () => {
  console.log('Remove succeed!');
});
myEvent.removeListener('logC', () => {
  console.log('Remove succeed!');
});

console.log(myEvent._events);
console.log(myEvent._count);
