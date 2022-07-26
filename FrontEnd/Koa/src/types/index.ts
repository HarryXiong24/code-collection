import context from '../core/context';
import request from '../core/request';
import response from '../core/response';

export type KoaContext = Partial<typeof context> & {
  [propName: string]: any;
};
export type KoaRequest = Partial<typeof request> & {
  [propName: string]: any;
};
export type KoaResponse = Partial<typeof response> & {
  [propName: string]: any;
};
export type KoaMiddleware = (ctx: KoaContext, ...args: any[]) => any;
export type KoaMiddlewares = KoaMiddleware[];
export type KoaNextHook = () => any;
export type Method = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS';
