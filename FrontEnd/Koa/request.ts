export const request = {
  req: {
    url: '',
    socket: '',
    headers: '',
  },
  origin: '',
  originalUrl: '',
  set url(val) {
    this.req.url = val;
  },
  get url() {
    return this.req.url;
  },
  get socket() {
    return this.req.socket;
  },
  get header() {
    return this.req.headers;
  },

  set header(val) {
    this.req.headers = val;
  },
  get href() {
    if (/^https?:\/\//i.test(this.originalUrl)) return this.originalUrl;
    return this.origin + this.originalUrl;
  },
};

export default request;
