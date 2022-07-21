export const response = {
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
  get body() {
    return this._body;
  },
  set body(originContent) {
    this.res.statusCode = 200;
    this._body = originContent;
  },
};

export default response;
