export type ListenerFunc = () => any;
export interface ListenerObj {
  listener: ListenerFunc;
}
export type Listener = ListenerFunc | ListenerObj;

/**
 * 判断是否为合法的 listener
 */
function isValidListener(listener: Listener) {
  if (typeof listener === 'function') {
    return true;
  } else if (listener && typeof listener === 'object') {
    isValidListener(listener.listener);
  } else {
    return false;
  }
}

/**
 * 根据 listener name 查找并返回对应的 listener
 */
function indexOfListener(listener_list: ListenerObj[], listener: Listener): number {
  let result: number = -1;
  const listener_copy: ListenerFunc = typeof listener === 'object' ? listener.listener : listener;

  for (let i = 0; i < listener_list.length; i++) {
    if (listener_list[i].listener === listener_copy) {
      result = i;
      break;
    }
  }

  return result;
}
