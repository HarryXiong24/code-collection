import http from 'http';
import EventEmitter from 'events';
import { compose } from '../utils/compose';
import context from './context';
import request from './request';
import response from './response';
import { KoaContext, KoaMiddleware, KoaRequest, KoaResponse } from '../types';
import respond from '../utils/respond';

export class Application extends EventEmitter {
  public middleware: KoaMiddleware[];
  public context: KoaContext;
  public request: KoaRequest;
  public response: KoaResponse;

  constructor() {
    super();
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  /**
   * 注册使用中间件
   * @param {Function} fn
   */
  use(fn: KoaMiddleware) {
    if (typeof fn === 'function') {
      this.middleware.push(fn);
      return this;
    } else {
      throw new TypeError('middleware must be a function!');
    }
  }

  /**
   * 创建通用上下文
   * @param {Object} req
   * @param {Object} res
   */
  createContext = (req: KoaRequest, res: KoaResponse) => {
    const ctx: KoaContext = Object.create(this.context);
    const request: KoaRequest = Object.create(this.request);
    const response: KoaResponse = Object.create(this.response);

    ctx.app = request.app = response.app = this;
    ctx.request = request;
    ctx.request.req = ctx.req = req;

    ctx.response = response;
    ctx.response.res = ctx.res = res;

    ctx.originalUrl = request.originalUrl = req.url;
    ctx.state = {};

    return ctx;
  };

  /**
   * 控制中间件的总回调方法
   */
  callback = (req: any, res: any) => {
    const ctx = this.createContext(req, res);
    res.statusCode = 404;
    const middleware = this.middleware;
    const onerror = this.onerror;
    const handleResponse = () => respond(ctx);
    // 执行中间件
    const fn = compose(middleware);
    fn(ctx).then(handleResponse).catch(onerror);
  };

  /**
   * 服务事件监听
   * @param {*} args
   */
  listen(...args: any[]) {
    const server = http.createServer(this.callback.bind(this));
    // console.log(...args);
    server.listen(...args);
  }

  onerror(err: Error) {
    console.log(err);
    throw new Error('server starter failed!');
  }

  static get default() {
    return Application;
  }
}

export default Application;
