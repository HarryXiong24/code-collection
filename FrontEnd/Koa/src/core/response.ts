import assert from 'assert';
import statuses from 'statuses';
import encodeUrl from 'encodeurl';
import { Stream } from 'stream';
import destroy from 'destroy';
import onFinish from 'on-finished';

export const response: any = {
  _body: undefined,
  _explicitStatus: false,
  headerSent: undefined,
  res: {
    statusCode: 404,
    statusMessage: '',
  },
  req: {
    httpVersionMajor: 0,
  },
  get socket() {
    return this.res.socket;
  },

  get header() {
    const { res } = this;
    return typeof res.getHeaders === 'function' ? res.getHeaders() : res._headers || {}; // Node < 7.7
  },
  get headers() {
    return this.header;
  },

  get status() {
    return this.res.statusCode;
  },
  set status(code) {
    if (this.headerSent) return;

    assert(Number.isInteger(code), 'status code must be a number');
    assert(code >= 100 && code <= 999, `invalid status code: ${code}`);
    this._explicitStatus = true;
    this.res.statusCode = code;
    if (this.req.httpVersionMajor < 2) this.res.statusMessage = (statuses as any)[code];
    if (this.body && statuses.empty[code]) this.body = null;
  },

  get message() {
    return this.res.statusMessage || (statuses as any)[this.status];
  },
  set message(msg) {
    this.res.statusMessage = msg;
  },

  get body() {
    return this._body;
  },
  set body(val) {
    const original = this._body;
    this._body = val;

    // no content
    if (val == null) {
      if (!statuses.empty[this.status]) {
        if (this.type === 'application/json') {
          this._body = 'null';
          return;
        }
        this.status = 204;
      }
      if (val === null) this._explicitNullBody = true;
      this.remove('Content-Type');
      this.remove('Content-Length');
      this.remove('Transfer-Encoding');
      return;
    }

    // set the status
    if (!this._explicitStatus) this.status = 200;

    // set the content-type only if not yet set
    const setType = !this.has('Content-Type');

    // string
    if (typeof val === 'string') {
      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
      this.length = Buffer.byteLength(val);
      return;
    }

    // buffer
    if (Buffer.isBuffer(val)) {
      if (setType) this.type = 'bin';
      this.length = val.length;
      return;
    }

    // stream
    if (val instanceof Stream) {
      onFinish(this.res, destroy.bind(null, val));
      if (original !== val) {
        val.once('error', (err) => this.ctx.onerror(err));
        // overwriting
        if (original != null) this.remove('Content-Length');
      }

      if (setType) this.type = 'bin';
      return;
    }

    // json
    this.remove('Content-Length');
    this.type = 'json';
  },

  redirect(url: string, alt: any) {
    // location
    if (url === 'back') url = this.ctx.get('Referrer') || alt || '/';
    this.set('Location', encodeUrl(url));

    // status
    if (!statuses.redirect[this.status]) this.status = 302;

    // html
    if (this.ctx.accepts('html')) {
      url = escape(url);
      this.type = 'text/html; charset=utf-8';
      this.body = `Redirecting to <a href="${url}">${url}</a>.`;
      return;
    }

    // text
    this.type = 'text/plain; charset=utf-8';
    this.body = `Redirecting to ${url}.`;
  },

  has(field: any) {
    return typeof this.res.hasHeader === 'function' ? this.res.hasHeader(field) : field.toLowerCase() in this.headers;
  },

  set(field: any, val: any) {
    if (this.headerSent) return;

    if (arguments.length === 2) {
      if (Array.isArray(val)) val = val.map((v) => (typeof v === 'string' ? v : String(v)));
      else if (typeof val !== 'string') val = String(val);
      this.res.setHeader(field, val);
    } else {
      for (const key in field) {
        this.set(key, field[key]);
      }
    }
  },

  append(field: any, val: any) {
    const prev = this.get(field);

    if (prev) {
      val = Array.isArray(prev) ? prev.concat(val) : [prev].concat(val);
    }

    return this.set(field, val);
  },

  remove(field: any) {
    if (this.headerSent) return;

    this.res.removeHeader(field);
  },
};

export default response;
