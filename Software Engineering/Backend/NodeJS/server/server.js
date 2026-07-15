const http = require('http');

function start(route, handle) {
  const port = '8080';

  const server = http.createServer((req, res) => {
    const pathname = req.url;
    console.log('Request for ' + pathname + ' received.');
    route(handle, pathname);
  });

  server.listen(port, () => {
    console.log(`Server has started.`);
  });
}

module.exports = {
  start,
};
