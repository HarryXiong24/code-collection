import { KoaMiddleware, Method, KoaContext, KoaNextHook } from '../../types/index';
class Layer {
  public path: string;
  public method: Method;
  public middleware: KoaMiddleware;
  public options?: any;

  constructor(path: string, method: Method, middleware: KoaMiddleware, options?: any) {
    this.path = path;
    this.method = method;
    this.middleware = middleware;
    this.options = options;
  }
}

export class Router {
  public stack: Layer[];
  public methods = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'];
  public options: Record<string, any>;

  // 初始化
  constructor(options = {}) {
    this.stack = [];
    this.options = options;
  }

  // 注册路由
  register(path: string, method: Method, middleware: KoaMiddleware, options?: any) {
    const route = new Layer(path, method, middleware, options);
    // 储存起来
    this.stack.push(route);
    return this;
  }

  get(path: string, middleware: KoaMiddleware) {
    this.register(path, 'GET', middleware);
  }

  post(path: string, middleware: KoaMiddleware) {
    this.register(path, 'POST', middleware);
  }

  delete(path: string, middleware: KoaMiddleware) {
    this.register(path, 'DELETE', middleware);
  }

  put(path: string, middleware: KoaMiddleware) {
    this.register(path, 'PUT', middleware);
  }

  patch(path: string, middleware: KoaMiddleware) {
    this.register(path, 'PATCH', middleware);
  }

  routes() {
    const stock = this.stack;
    return async (ctx: KoaContext, next: KoaNextHook) => {
      // 当前的路径
      const currentPath = ctx.path;
      // 定义存放中间件的容器
      let route: KoaMiddleware | undefined;

      for (let i = 0; i < stock.length; i++) {
        const item = stock[i];
        // 如果当前的路由路径和 item 里面存储的一样，并且请求方法也一样，则保存中间件
        if (currentPath === item.path && item.method === ctx.method) {
          route = item.middleware;
          break;
        }
      }

      // 如果中间件是函数，则调用
      if (typeof route === 'function') {
        route(ctx, next);
        return;
      }

      await next();
    };
  }
}

export default Router;
