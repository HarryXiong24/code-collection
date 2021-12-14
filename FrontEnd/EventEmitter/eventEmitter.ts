type ListenerFunc = () => any;

interface Listener {
  listener: ListenerFunc;
  once: boolean;
}

interface ListenersContainer {
  [propName: string]: Listener[];
}

/**
 * 判断是否为合法的 listener
 */
function isValidListener(listener: ListenerFunc) {
  if (typeof listener === 'function') {
    return true;
  } else {
    return false;
  }
}

/**
 * 根据 listener name 查找并返回对应的 listener
 */
function indexOfListener(listener_list: Listener[], listener: ListenerFunc): number {
  let result: number = -1;

  for (let i = 0; i < listener_list.length; i++) {
    if (listener_list[i].listener === listener) {
      result = i;
      break;
    }
  }

  return result;
}

class EventEmitter {
  // 存放所有的监听时间
  public _events: ListenersContainer = {};

  constructor() {}

  /**
   * 添加事件
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  on(eventName: string, listener: ListenerFunc) {
    if (!isValidListener(listener)) {
      throw new TypeError('Listener must be a function!');
    }

    const listeners = this._events[eventName] || [];

    // 不重复添加事件
    if (indexOfListener(listeners, listener) === -1) {
      listeners.push({
        listener: listener,
        once: false,
      });
    } else {
      throw new TypeError('Cannot add the same function repeatedly!');
    }

    // 将 listeners 数组归还到 this._events[eventName]
    this._events[eventName] = listeners;

    return this;
  }

  /**
   * 添加事件，该事件只能被执行一次
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  once(eventName: string, listener: ListenerFunc) {
    if (!isValidListener(listener)) {
      throw new TypeError('Listener must be a function!');
    }

    const listeners = this._events[eventName] || [];

    // 不重复添加事件
    if (indexOfListener(listeners, listener) === -1) {
      listeners.push({
        listener: listener,
        once: true,
      });
    } else {
      throw new TypeError('Cannot add the same function repeatedly!');
    }

    // 将 listeners 数组归还到 this._events[eventName]
    this._events[eventName] = listeners;

    return this;
  }

  /**
   * 删除某一个类型的所有事件或者所有事件
   * @param  {String[]} eventName 事件名称
   * @return {Object} 可链式调用
   */
  off(eventName: string) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return this;
    }

    Reflect.deleteProperty(this._events, eventName);

    return this;
  }

  /**
   * 删除指定的事件
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  offItem(eventName: string, listener: ListenerFunc) {
    if (!isValidListener(listener)) {
      throw new TypeError('Listener must be a function!');
    }

    const listeners = this._events[eventName];
    if (!listeners) {
      return this;
    }

    let index: number = indexOfListener(listeners, listener);

    if (index !== -1) {
      // 处理 listeners
      listeners.splice(index, 1);
    }

    return this;
  }
}

//tests
const emitter = new EventEmitter();

const func1 = () => {};

emitter.on('num1', func1);

emitter.on('num2', () => {});
emitter
  .once('num2', () => {})
  ?.on('num2', () => {})
  ?.once('num2', () => {})
  ?.on('num3', () => {});

emitter.offItem('num1', func1)?.off('num4')?.off('num3');

console.log(emitter._events);
