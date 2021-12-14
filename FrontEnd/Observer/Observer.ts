// 观察者类
class Observer {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  // 观测到变化后的处理
  update(observed: Observed) {
    console.log('观察者' + this.id + `-检测到被观察者${observed.id}变化`);
  }
}

// 被观察者列
class Observed {
  private observers: Observer[];
  public id: number;

  constructor(id: number) {
    this.observers = [];
    this.id = id;
  }

  // 添加观察者
  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  // 删除观察者
  removeObserver(observer: Observer) {
    this.observers = this.observers.filter((o) => {
      return o.id !== observer.id;
    });
  }

  // 通知所有的观察者更新
  notify() {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

// test
let observed = new Observed(0);
let observer1 = new Observer(1);
let observer2 = new Observer(2);

observed.addObserver(observer1);
observed.addObserver(observer2);

observed.notify();
