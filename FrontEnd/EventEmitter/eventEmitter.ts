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

  // 添加事件
  on(eventName: string, listener: ListenerFunc) {
    if (!eventName || !listener) {
      return;
    }

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
  }
}

// test
let emitter = new EventEmitter();
emitter.on('num1', () => {
  console.log('1');
});
emitter.on('num2', () => {});
console.log(emitter._events);
