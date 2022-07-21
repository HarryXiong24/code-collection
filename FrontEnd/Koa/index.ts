import http from 'http';
import { compose } from './compose';
import context from './context';
import request from './request';
import response from './response';
import { Context, Middleware, Request, Response } from './types';

export class Application {
  public middleware: Middleware;
  public context: Context;
  public request: Request;
  public response: Response;

  constructor() {
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  /**
   * 注册使用中间件
   * @param {Function} fn
   */
  use(fn: (ctx: any, ...args: any[]) => any) {
    if (typeof fn === 'function') {
      this.middleware.push(fn);
    }
  }

  /**
   * 创建通用上下文
   * @param {Object} req
   * @param {Object} res
   */
  createContext = (req: Request, res: Response) => {
    const ctx: Context = Object.create(this.context);
    const request: Request = Object.create(this.request);
    const response: Response = Object.create(this.response);
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
    const middleware = this.middleware;
    const body = ctx.body;
    // 执行中间件
    compose(middleware)(ctx).catch((err) => this.onerror(err));
    if (body) {
      res.end(body);
    } else {
      res.end('Not Found');
    }
  };

  /**
   * 异常处理监听
   * @param {EndOfStreamError} err
   */
  onerror(err: Error) {
    console.log(err);
  }

  /**
   * 服务事件监听
   * @param {*} args
   */
  listen(...args: any[]) {
    const server = http.createServer(this.callback);
    // console.log(...args);
    server.listen(...args);
  }
}

export default Application;
