import Watcher from './Watcher';

/**
 * 收集依赖，添加观察者(watcher)
 * 通知所有观察者
 */
class Dep {
  public subs: Watcher[];
  public static target: Watcher | null;

  constructor() {
    this.subs = [];
  }

  // 添加观察者
  addSub(sub: Watcher) {
    if (sub) {
      this.subs.push(sub);
    }
  }

  // 移除观察者
  removeSub(sub: Watcher) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }

  // 发送通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

export default Dep;
