import { format, URL } from 'url';
import parse from 'parseurl';
import qs from 'querystring';

const IP = Symbol('context#ip');

export const request: any = {
  originalUrl: '',

  get header() {
    return this.req.headers;
  },
  set header(val) {
    this.req.headers = val;
  },

  get headers() {
    return this.req.headers;
  },
  set headers(val) {
    this.req.headers = val;
  },

  set method(val) {
    this.req.method = val;
  },
  get method() {
    return this.req.method;
  },

  get path() {
    return parse(this.req as any)?.pathname;
  },
  set path(path) {
    const url = parse(this.req);

    if (url?.pathname === path) {
      return;
    }

    (url as any).pathname = path;
    (url as any).path = null;

    this.url = format(url as unknown as URL);
  },

  get query() {
    const str = this.querystring;
    const c = (this._querycache = this._querycache || {});
    return c[str] || (c[str] = qs.parse(str));
  },
  set query(obj) {
    this.querystring = qs.stringify(obj);
  },

  set url(val) {
    this.req.url = val;
  },
  get url() {
    return this.req.url;
  },

  get origin() {
    return `${this.protocol}://${this.host}`;
  },

  get href() {
    if (/^https?:\/\//i.test(this.originalUrl)) {
      return this.originalUrl;
    }
    return this.origin + this.originalUrl;
  },

  get socket() {
    return this.req.socket;
  },

  get querystring() {
    if (!this.req) {
      return '';
    }
    return parse(this.req)?.query || '';
  },
  set querystring(str) {
    const url = parse(this.req);
    if (url?.search === `?${str}`) return;

    (url as any).search = str;
    (url as any).path = null;

    this.url = format(url as unknown as URL);
  },

  get search() {
    if (!this.querystring) return '';
    return `?${this.querystring}`;
  },
  set search(str) {
    this.querystring = str;
  },

  get host() {
    const proxy = this.app.proxy;
    let host = proxy && this.get('X-Forwarded-Host');
    if (!host) {
      if (this.req.httpVersionMajor >= 2) host = this.get(':authority');
      if (!host) host = this.get('Host');
    }
    if (!host) return '';
    return host.split(/\s*,\s*/, 1)[0];
  },

  get hostname() {
    const host = this.host;
    if (!host) return '';
    if (host[0] === '[') return this.URL.hostname || ''; // IPv6
    return host.split(':', 1)[0];
  },

  get URL() {
    /* istanbul ignore else */
    if (!this.memoizedURL) {
      const originalUrl = this.originalUrl || ''; // avoid undefined in template string
      try {
        this.memoizedURL = new URL(`${this.origin}${originalUrl}`);
      } catch (err) {
        this.memoizedURL = Object.create(null);
      }
    }
    return this.memoizedURL;
  },

  get ip() {
    if (!this[IP]) {
      this[IP] = this.ips[0] || this.socket.remoteAddress || '';
    }
    return this[IP];
  },

  set ip(_ip) {
    this[IP] = _ip;
  },
};

export default request;
