import { Stream } from 'stream';
import { KoaContext } from '../types';

export default function respond(ctx: KoaContext) {
  const res = ctx.res;
  if (typeof ctx.body == 'object') {
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    res.end(JSON.stringify(ctx.body));
  } else if (ctx.body instanceof Stream) {
    ctx.body.pipe(res);
  } else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
    res.setHeader('Content-Type', 'text/htmlcharset=utf8');
    res.end(ctx.body);
  } else {
    res.end('Not found');
  }
}
