export default class Dep {
  private subs: any[];

  constructor() {
    this.subs = [];
  }

  addSub(sub: any) {
    this.subs.push(sub);
  }

  removeSub(sub: any) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }

  // window.target 实际上就是一个 watcher 对
  // 我们在 dep 实例中收集 watche r对象的目的就是在数据发生更新时，能够调用已经收集到的 watcher 对象的 update 方法来更新视图
  depend() {
    if ((window as any).target) {
      this.subs.push((window as any).target);
    }
  }

  notify() {
    // 拷贝一份，避免直接操作数据
    const subs = this.subs;
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}
